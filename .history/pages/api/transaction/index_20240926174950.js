import dbConnect from '../../../lib/mongodb';
import Item from '@/models/Item';
Import Transaction


export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
  

    case 'GET':
      try {
        const items = await Item.find({});
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}