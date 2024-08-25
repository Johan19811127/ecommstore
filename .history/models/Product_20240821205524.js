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
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
            required: true,
          },
          cost: {
            type: Number,
            required: true,
            min: 0,
            default:0,
          },

          selling: {
            type: Number,
            required: true,
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
  
    images: [
     Sting    ],
   
  
 
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
