import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }, // e.g., 'Samsung', 'Apple'
    country: { type: String }, // Optional: country of origin
    description: { type: String },
    logo: { type: String }, // URL or path to the brand's logo
  });
  
  export default mongoose.model('Brand', brandSchema);
  