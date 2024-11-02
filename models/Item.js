import mongoose from 'mongoose';







const ItemSchema = new mongoose.Schema(
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

  
    selling: {
      type: Number,
  
      min: 0,
      default:0,
    },

    onOrder: {
      type: Number,
 
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

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);