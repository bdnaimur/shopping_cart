import mongoose from "mongoose";

const auditTrailSchema = new mongoose.Schema({
    action: { type: String, required: true }, // e.g., 'CREATE', 'UPDATE', 'DELETE'
    documentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    documentType: { type: String, required: true }, // e.g., 'Product', 'ProductDetails'
    changes: { type: Map, of: String }, // Store the changes made
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who made the change
    timestamp: { type: Date, default: Date.now },
  });
  
export default mongoose.model('AuditTrail', auditTrailSchema);
  