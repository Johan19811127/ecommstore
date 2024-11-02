import dbConnect from '../../../lib/mongodb';
import Transaction from '@/models/Transaction';



export default async function handler(req, res) {
    const { method } = req;
  
    await dbConnect();
  
    switch (method) {
      case 'POST':
        try {
          const { transactDate, transactType, party, docNumber,rows, enteredBy} = req.body;
  
     
  
  
          // Create the items for the product
          const transactPromises = rows.map((row) => {
            const newTransaction = new Transaction({
              transactDate: transactDate,
              TransactType: transactType,
              party: party,
              docNumber: docNumber,
              product: row.product._id,
              productName:row.product.name,
              item:row.item._id,
              itemName:row.item.size,
              totalCost: row.totalCost,
              quantity: row.quantity,
              cost: row.cost,
              enteredBy:enteredBy,
            });
            return newTransaction.save();
          });
  
          await Promise.all(transactPromises);
  
          res.status(201).json({ success: true, message: 'Transactionsscreated successfully' });
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