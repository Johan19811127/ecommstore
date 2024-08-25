// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  accountno: {
    type: String,
    trim:
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);