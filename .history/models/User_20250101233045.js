
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  
    uid: String,
    displayName: String,
    email: String,
    photoURL: String,
    cellphone:String,
    learners:[{
        
            fullName:  String,
            Grade: String,
            Class: String,
        
    }],
    role:{
        type: String,
        required:true,
        enum: ['Client','User', 'Admin', 'Staff','Operations'],
        default: 'Client',
    }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);