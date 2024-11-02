import dbConnect from '../../../lib/mongodb';
import Item from '@/models/Item';

export default async function handler(req, res) {
    const { productId } = req.query;
    const { method } = req;
    

  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' });
  }

  try {
    const { db } = await dbConnect();
    const items = await db
      .collection('items')
      .find({ productId })
      .toArray();

    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}