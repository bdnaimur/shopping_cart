import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
    key: { type: String, required: true }, // e.g., 'Processor', 'RAM'
    value: { type: String, required: true }, // e.g., 'Snapdragon 8 Gen 3', '12GB'
  });
  
export default mongoose.model('Specification', specificationSchema);
  