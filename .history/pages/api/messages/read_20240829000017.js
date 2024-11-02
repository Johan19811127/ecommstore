// pages/api/messages/read.js
import dbConnect from '../../../utils/dbConnect';
import Message from '../../../models/Message';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { messageId } = req.body;

    try {
      const message = await Message.findById(messageId);
      if (message) {
        message.read = true;
        await message.save();
        res.status(200).json({ success: true, data: message });
      } else {
        res.status(404).json({ success: false, message: 'Message not found' });
      }
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
