import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema(
  {
    accno: {
      type: String,
      trim: true,
    },
    
    name: {
      type: String,
      required: true,
      trim: true,
    },
 
      phone: {
        type: String,
        required: true,
        trim: true,
      },

      bank:{
        type:String,
        
      },
accname:{
  type:String,
},
acctype:{
  type:String
}
bankacc:{
  
}

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
     
        street: {
          type: String,
          required: true,
          trim: true,
        },
        city: {
          type: String,
          required: true,
          trim: true,
        },
        state: {
          type: String,
          required: true,
          trim: true,
        },
        postalCode: {
          type: String,
          required: true,
          trim: true,
        },
        country: {
          type: String,
          required: true,
          trim: true,
        },
        contact:{
          type:String,
          trim:true,
        },
  
    productsSupplied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    
      creditLimit: {
        type: number,
      
      },
      creditTerms: {
        type: String,
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

export default mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);


