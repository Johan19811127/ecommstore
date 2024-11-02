import dbConnect from '../../../lib/mongodb';
import Item from '@/models/Item';
import Product from '@/models/Product';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
  

    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}