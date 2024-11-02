import mongoose from 'mongoose';







const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
   
    },
   creditor:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
   },
      status: {
        type: String,
        enum: ['Active', 'Inactive', 'Preorder'],
        default: 'Active',
      },
  
    images: [String],
   
  
 
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

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
