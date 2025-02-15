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
  productas:{
    type:String,

  }
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);