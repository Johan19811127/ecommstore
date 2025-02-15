// models/Post.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);