import dbConnect from '../../../lib/mongodb';
import Transaction from '@/models/Transaction';



export default async function handler(req, res) {
    const { method } = req;
  
    await dbConnect();
  
    switch (method) {
      case 'POST':
        try {
          const { transactDate, transactType, with, docno, product, productName, item, itemName, quantity, lastCost, totalCost , enteredBy;} = req.body;
  
          // Validate required fields
          if (!name || !group || !sizes || sizes.length === 0 || !images || images.length === 0) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
          }
  
          // Create the product
          const newProduct = new Transaction({
            name,
            description,
            group,
            creditor,
            status,
            images,
          });
  
          const savedProduct = await newProduct.save();
  
          // Create the items for the product
          const itemPromises = sizes.map((size) => {
            const newItem = new Item({
              name,
              size: size.size,
              quantity: 0,
              totalCost: 0,
              selling: size.selling,
              product: savedProduct._id,
            });
            return newItem.save();
          });
  
          await Promise.all(itemPromises);
  
          res.status(201).json({ success: true, message: 'Product and items created successfully' });
        } catch (error) {
          console.error('Server error:', error); // Log error on the server side
          res.status(500).json({ success: false, error: error.message }); // Return JSON with error
        }
        break;
  
      case 'GET':
        try {
          const products = await Product.find({});
          res.status(200).json({ success: true, data: products });
        } catch (error) {
          console.error('Server error:', error);
          res.status(500).json({ success: false, error: error.message });
        }
        break;
  
      default:
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }