import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },
    description: { 
      type: String, 
      required: true 
    },
    images: [{ 
      type: String, 
      required: true 
    }],
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  });
  
  export default  mongoose.model('Product', ProductSchema);

 