import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },  // 'user' or 'admin'
  recipient: { type: String, required: true },  // 'admin' or 'user'
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },  // New field to track if the message is read
});

export default mongoose.models.Message || mongoose.model('Message', PostSchema);