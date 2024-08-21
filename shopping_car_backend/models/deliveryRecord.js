import mongoose from 'mongoose';

const DeliveryRecordSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  deliveryStatus: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
  },
  trackingNumber: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DeliveryRecord = mongoose.model('DeliveryRecord', DeliveryRecordSchema);
export default DeliveryRecord;
