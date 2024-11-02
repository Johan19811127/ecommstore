import mongoose from 'mongoose';







const ProductSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
     
    },
    productName: {
      type: String,
      trim: true,
    },

    size:{
      type: String,
    
    },
    lastCost: {
      type: Number,
   
      min: 0,
      default:0,
    },
  
    selling: {
      type: Number,
  
      min: 0,
      default:0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default:0,
  
    },
    onOrder: {
      type: Number,
      required: true,
      min: 0,
      default:0,
    },
    totalCost:{
      type: Number,
      required: true,
      min: 0,
      default:0,

    },
  
 
    createdAt: {
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

export default mongoose.models.Item || mongoose.model('Product', ProductSchema);