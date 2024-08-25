import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema(
  {
    accNo: {
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
        
        trim: true,
      },

      bank:{
        type:String,
        
      },
accName:{
  type:String,
},
accType:{
  type:String
},
bankAcc:{
  type:String,
},
branch:{
  type:String,
},

      email: {
        type: String,
       
        trim: true,
        lowercase: true,
      },
     
        street: {
          type: String,
         
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
        type: string,
      
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


