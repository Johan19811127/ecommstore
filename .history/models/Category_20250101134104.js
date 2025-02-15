// models/Post.js
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  name: {
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

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);