import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema({
    productDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetails', required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  });
  
export default mongoose.model('PriceHistory', priceHistorySchema);
  