import dbConnect from '../../../lib/mongodb';
import Category from '@/models/Category';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const supplier = await Supplier.create(req.body);
        res.status(201).json({ success: true, data: supplier });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'GET':
      try {
        const categories = await Supplier.find({});
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'supplier']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
