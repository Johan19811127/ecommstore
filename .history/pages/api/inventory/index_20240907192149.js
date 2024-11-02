import dbConnect from '../../../lib/mongodb';// Assume you have a db connection utility
import Product from '@/models/Product'; // Your Product model

export default async function handler(req, res) {
  const { rows, supplier, docno, docdate } = req.body;

  await dbConnect();

  try {
    for (const row of rows) {
      const { productId, size, qty, cost } = row;

      // Find the product in the database
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      // Update stock for the specific size
      const sizeToUpdate = product.sizes.find((s) => s.size === size);

      if (sizeToUpdate) {
        sizeToUpdate.onHand += qty; // Increase stock

        if (sizeToUpdate.onOrder > 0) {
          sizeToUpdate.onOrder = Math.max(sizeToUpdate.onOrder - qty, 0); // Reduce on order
        }
      } else {
        return res.status(400).json({ success: false, message: 'Size not found in product' });
      }

      // Save the updated product
      await product.save();
    }

    return res.status(200).json({ success: true, message: 'Stock updated successfully' });
  } catch (error) {
    console.error('Error updating stock:', error);
    return res.status(500).json({ success: false, message: 'Error updating stock' });
  }
}
