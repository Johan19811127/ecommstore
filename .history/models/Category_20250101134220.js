// models/Post.js
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref:,
  },
  description: {
    type: String,
    
  },
  icon:{
    type:String,

  }
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);