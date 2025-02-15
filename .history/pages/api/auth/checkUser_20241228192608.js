import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { uid, displayName, email, photoURL } = req.body;

  try {
    // Connect to the database
    await dbConnect();

    // Check if user exists
    let user = await User.findOne({ uid });

    // Create user if not exists
    if (!user) {
      user = await User.create({
        _id:email,
        uid,
        displayName,
        email,
        photoURL,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
