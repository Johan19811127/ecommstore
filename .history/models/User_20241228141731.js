// models/Post.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    _id: String,
    uid: String,
    displayName: String,
    email: String,
    photoURL: String,
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);