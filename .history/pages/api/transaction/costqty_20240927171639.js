import dbConnect from '../../../lib/mongodb';
import Transaction from '@/models/Transaction';


export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const products 
    const result = await Transaction.aggregate([
        { $match: { item: mongoose.Types.ObjectId(item) } },
      // Group by itemId and sum the quantity and cost
      {
        $group: {
          _id: "$item",
          totalOnHand: { $sum: "$quantity" },  // Sum the quantity to get total on hand
          totalCost: { $sum: { $multiply: ["$quantity", "$cost"] } } // Sum the total cost (quantity * cost)
        }
      },
      // Add a field to calculate the cost price (totalCost / totalOnHand)
      {
        $addFields: {
          costPrice: {
            $cond: {
              if: { $eq: ["$totalOnHand", 0] }, // Avoid division by zero
              then: 0, // If totalOnHand is 0, cost price is 0
              else: { $divide: ["$totalCost", "$totalOnHand"] } // Otherwise, divide totalCost by totalOnHand
            }
          }
        }
      }
    },
]);

res.status(200).json({ success: true, data: products });
} catch (error) {
res.status(400).json({ success: false, error: error.message });
}
break;

default:
res.setHeader('Allow', ['GET']);
res.status(405).end(`Method ${method} Not Allowed`);
}
}