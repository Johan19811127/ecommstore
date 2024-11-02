
iimport dbConnect from '../../../lib/mongodb';
import Item from '@/models/Item';

export default async function handler(req, res) {
  const { productId } = req.query;
  const { method } = req;

  // Check for GET request
  if (method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests allowed' });
  }

  try {
    // Establish the Mongoose database connection
    await dbConnect();

    // Find items where the product field matches the productId
    const items = await Item.find({ product: productId });

    // If items are found, return them, otherwise return a 404
    if (items.length > 0) {
      res.status(200).json({ items });
    } else {
      res.status(404).json({ message: 'No items found for this product' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}