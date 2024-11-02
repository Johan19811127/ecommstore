
import dbConnect from '../../../lib/mongodb';
import Product from '@/models/Product';
import Item from '@/models/Item';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { name, description, group, creditor,status, images,sizes } = req.body;
        const newProduct = new Product({
          name,
          description,
          group,
          
        });
  
        const savedProduct = await newProduct.save();
  
        // Step 2: Create items with reference to the product
        const itemPromises = items.map((item) => {
          const newItem = new Item({
            size: item.size,
            quantity: item.quantity,
            product: savedProduct._id, // Reference the product ID
          });
          return newItem.save();
        });
      break;
    case 'GET':
      try {
        const products = await Product.find({})
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'product']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
