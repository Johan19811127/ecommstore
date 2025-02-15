// models/Post.js
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  total: {
    type: Number,
    
  },
  products:[{
    product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
   
  },
  productName:{
      type:String,

  },
  item:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
  },

  itemName:{
      type:String
  },

  quantity:{
  type:Number,
  },

  cost:{
      type:Number,
  },

  price:{
      type:Number,
  },
  }

  ],  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},
  
  { timestamps: true }

 

);

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);