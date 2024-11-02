import mongoose from 'mongoose';


const 

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
    sku: {
      type: String,
      unique: true,
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
    sizes: [
        {
          size: {
            type: String,
          
          },
          cost: {
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
        },
      ],
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
