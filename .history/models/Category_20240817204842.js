// models/Post.js
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
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

export default mongoose.models.Post || mongoose.model('Category', CategorySchema);