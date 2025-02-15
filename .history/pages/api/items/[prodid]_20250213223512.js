
import dbConnect from '../../../lib/mongodb';
import Item from '../../models/Item';
import mongoose from 'mongoose'; // Import mongoose to use ObjectId

export default async function handler(req, res) {
  const { productId } = req.query;  // Get productId from the query string
  const { method } = req;

  // Check for GET request
  if (method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests allowed' });
  }

  try {
    // Connect to the MongoDB database using Mongoose
    await dbConnect();

    // Convert productId to an ObjectId
    const objectId = new mongoose.Types.ObjectId(productId);

    // Find items where the 'product' field matches the productId as an ObjectId
    const items = await Item.find({ product: objectId });

    // If items are found, return them, otherwise return a 404
    if (items.length > 0) {
      res.status(200).json({ items });
    } else {
      res.status(404).json({ message: 'No items found for this product' });
    }
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}