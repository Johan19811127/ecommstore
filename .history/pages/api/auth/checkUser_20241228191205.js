import dbConnect from '../../../lib/mongodb';
import User from '@/models/User';
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { uid, displayName, email, photoURL } = req.body;

  try {
    const { db } = await dbConnect();
    const usersCollection = db.collection('users');

    // Check if user exists
    let user = await usersCollection.findOne({ uid });

    // Create user if not exists
    if (!user) {
      const result = await usersCollection.insertOne({
        uid,
        displayName,
        email,
        photoURL,
        createdAt: new Date(),
      });
      user = result.ops[0]; // The inserted user document
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
