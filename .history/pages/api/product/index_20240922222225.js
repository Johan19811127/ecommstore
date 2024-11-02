import dbConnect from '../../../lib/mongodb';
import Product from '@/models/Product';
import Item from '@/models/Item';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { name, description, group, creditor, status, images, sizes } = req.body;

        // Step 1: Create the product
        const newProduct = new Product({
          name,
          description,
          group,
          creditor,
          status,
          images,
        });

        const savedProduct = await newProduct.save();

        // Step 2: Create the items for the product
        const itemPromises = sizes.map((size) => {
          const newItem = new Item({
            name,
            size: size.size,
            quantity: 0,
            totalCost: 0,
            selling: size.selling,
            product: savedProduct._id, // Reference the product ID
          });
          return newItem.save();
        });

        await Promise.all(itemPromises);

        res.status(201).json({ message: 'Product and items created successfully' });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
