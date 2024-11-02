
import dbConnect from '../../../lib/mongodb';
import { ObjectId } from 'mongodb'; // Make sure to import this to cast IDs if needed

export default async function handler(req, res) {
  const { productId } = req.query;
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' });
  }

  try {
    const db = await dbConnect();

    // Assuming productId is stored as an ObjectId in MongoDB, convert it to ObjectId
    const items = await db
      .collection('items')
      .find({ product: ObjectId(productId) }) // Ensure the query field matches your schema (product)
      .toArray();

    res.status(200).json({ items });
  } catch (error) {
    console.error(error); // Add logging for debugging
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}