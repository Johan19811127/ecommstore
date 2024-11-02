// pages/api/messages/send.js
import dbConnect from '@/lib/mongodb';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { sender, recipient, content } = req.body;

    try {
      const message = new Message({ sender, recipient, content });
      await message.save();

      res.status(201).json({ success: true, data: message });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}