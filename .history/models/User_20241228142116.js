// models/Post.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    _id: String,
    uid: String,
    displayName: String,
    email: String,
    photoURL: String,
    role:{
        type: String,
        required:true,
        enum: ['Client','User', 'Admin', 'Staff','Operations'],
        default: 'Client",
    }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);