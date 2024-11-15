import dbConnect from '../../../lib/mongodb';
import Product from '@/models/Product';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();


    try {
      const products = await Product.find({})
      
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
   
 
    res.setHeader('Allow', ['GET', 'product']);
    res.status(405).end(`Method ${method} Not Allowed`);
}