// pages/api/products/[id].js
import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        if (!product) {

          const sizes
          return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    // Other methods...
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
