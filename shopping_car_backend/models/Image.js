import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    description: { type: String }, // e.g., 'Front view', 'Back view'
    altText: { type: String }, // Alt text for accessibility
  });
  
  export default mongoose.model('Image', imageSchema);
  