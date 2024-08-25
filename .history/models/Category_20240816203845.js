// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon:{
    type:String,

  }
});

export default mongoose.models.Post || mongoose.model('Category', CategorySchema);