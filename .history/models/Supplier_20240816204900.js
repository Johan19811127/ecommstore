// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  namr: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);