import Message from '../../../models/Message';
d

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { sender, recipient } = req.query;

    try {
      const messages = await Message.find({
        $or: [
          { sender, recipient },
          { sender: recipient, recipient: sender },
        ],
      }).sort({ timestamp: 1 });

      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}