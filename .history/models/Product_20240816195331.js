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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
    
      discount: {
        type: Number,
        default: 0, // percentage discount, e.g., 20 means 20% off
      },
    },
    stock: {
      totalQuantity: {
        type: Number,
        required: true,
        min: 0,
      },
      sizes: [
        {
          size: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 0,
          },
        },
      ],
      color: {
        type: String,
        required: true,
      },
      availability: {
        type: String,
        enum: ['In Stock', 'Out of Stock', 'Preorder'],
        default: 'In Stock',
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    attributes: {
      material: {
        type: String,
        trim: true,
      },
      weight: {
        type: Number, // e.g., 500 (grams)
      },
      dimensions: {
        length: {
          type: Number, // e.g., 100 (cm)
        },
        width: {
          type: Number, // e.g., 50 (cm)
        },
        height: {
          type: Number, // e.g., 20 (cm)
        },
      },
    },
    ratings: {
      averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      reviewCount: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
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
