
import dbConnect from '../../../lib/mongodb';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await dbConnect(); // Ensure the MongoDB connection is established

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const supplierInv = req.body;

    for (const item of supplierInv.items) {
      await Product.updateOne(
        { _id: item.productId },
        { 
          $inc: { 
            [`sizes.${item.size}.quantity`]: item.receivedQuantity,
            [`sizes.${item.size}.onOrder`]: -item.receivedQuantity
          },
        },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ success: true, message: 'Stock updated successfully' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: 'Error updating stock', error });
  }
}