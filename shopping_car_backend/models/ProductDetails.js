import mongoose from "mongoose";

const productDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    keyFeatures: { type: [String], required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }], // References to the Image schema
    specifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Specification' }],
    stock: { type: Number, required: true },
  });
 export default mongoose.model('ProductDetails', productDetailsSchema);
  