import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true }, // e.g., 'Smartphones', 'Tablets'
    description: { type: String },
  });
  
 export default mongoose.model('Category', categorySchema);

  