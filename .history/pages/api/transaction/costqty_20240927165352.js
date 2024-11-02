async function getAllOnHand() {
    const result = await Transaction.aggregate([
        { $match: { item: mongoose.Types.ObjectId(itemId) } },
      // Group by itemId and sum the quantity and cost
      {
        $group: {
          _id: "$itemId",
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
    ]);
  
    return result;  // Return the array of itemId, totalOnHand, totalCost, and costPrice
  }