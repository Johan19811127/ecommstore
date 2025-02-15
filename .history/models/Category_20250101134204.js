// models/Post.js
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    
  },
  icon:{
    type:String,

  }
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);