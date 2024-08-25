import dbConnect from '../../../lib/mongodb';
import Product from '@/models/Product';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();


    try {
      const products = await Product.find({})
      const result = await products.aggregate([
        { "$unwind": "$sizes" },
        { 
          "$group": {
            "_id": "$_id",
            "minAmount": { "$min": "$sizes.selling" },
            "maxAmount":{"$max" : "$sizes.selling"}
          }
        }
        res.status(200).json({ success: true, data: results });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
   
      ]).toArray();
     
 
    res.setHeader('Allow', ['GET', 'product']);
    res.status(405).end(`Method ${method} Not Allowed`);

 
}