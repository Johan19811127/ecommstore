import dbConnect from '../../../lib/mongodb';
import Product from '@/models/Product';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const result = await Product.aggregate([
      { "$unwind": "$sizes" },
      { 
        "$group": {
          "_id": "$_id",
          "minAmount": { "$min": "$sizes.selling" },
          "maxAmount": { "$max": "$sizes.selling" }
        }
      }
    ]);

    res.status(200).json({ success: true, data: result });
    console
  } catch (error) {
    console.error('Error fetching product price ranges:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
