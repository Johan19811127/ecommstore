
import dbConnect from '../../../lib/mongodb';
import Product from '@/models/Product';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const supplier = await Product.create(req.body);
        res.status(201).json({ success: true, data: supplier });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'GET':
      try {
        const suppliers = await Product.find({});
        res.status(200).json({ success: true, data: suppliers });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'supplier']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
