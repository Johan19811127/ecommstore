// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  accountno: {
    type: String,
    trim: true,
  },
  contactPerson: {
    type: String,
    trim: true,
  },
  phone: [
    {
      type: {
        type: String,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
        min: 0,
        default:0,
      },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);