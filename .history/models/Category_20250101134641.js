// models/Post.js
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
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

  totalCost:{
      type:Number,
  },
  }

  ]
   


});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);