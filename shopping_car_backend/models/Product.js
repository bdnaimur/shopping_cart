import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sku: { type: String, unique: true, required: true }, // SKU must be unique
  productDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetails', required: true }, // Reference to common details
  isSold: { type: Boolean, default: false }, // Tracks if the product has been sold
  dateAdded: { type: Date, default: Date.now },
});

export default mongoose.model('Product', productSchema);
