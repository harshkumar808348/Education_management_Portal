import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  transactionTime: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Payment', paymentSchema);