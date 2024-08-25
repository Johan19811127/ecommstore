import dbConnect from '../../../lib/mongodb';
import Product from '@/models/Product';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();


    try {
      const products = await Product.find({})
      const sizes = 
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
   
 
    res.setHeader('Allow', ['GET', 'product']);
    res.status(405).end(`Method ${method} Not Allowed`);

  const result = await collection.aggregate([
    { "$unwind": "$subcollection" },
    { 
      "$group": {
        "_id": "$_id",
        "minAmount": { "$min": "$sizes.selling" },
        "maxAmount":{}
      }
    }
  ]).toArray();
}