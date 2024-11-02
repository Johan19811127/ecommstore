import dbConnect from '../../../lib/mongodb';
import Item from '@/models/Item';
import Product from '@/models/Product';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products = await Product.aggregate([
          {
            $lookup: {
              from: 'items', // The collection where your items are stored
              localField: '_id',
              foreignField: 'product', // The field in items that references the product
              as: 'items', // This will create an array of items for each product
            },
          },
          {
            $addFields: {
              min: { $min: '$items.selling' }, // Get the minimum selling price from items
              maxSellingPrice: { $max: '$items.selling' }, // Get the maximum selling price from items
            },
          },
          {
            $project: {
              name: 1,
              description: 1,
              minSellingPrice: 1,
              maxSellingPrice: 1,
            },
          },
        ]);

        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}