// models/Post.js
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref:"User",
  },
  total: {
    type: Number,
    
  },
  products:[

  ]
   

  }
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);