// pages/api/users.js
import db
import Message from '../../../models/Message';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const users = await Message.aggregate([
        { $match: { recipient: 'admin' } },
        { $group: { _id: '$sender', lastMessage: { $last: '$$ROOT' } } },
        { $lookup: { from: 'users', localField: '_id', foreignField: 'uid', as: 'user' } },
        { $unwind: '$user' },
        { $sort: { 'lastMessage.timestamp': -1 } },
      ]);

      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}