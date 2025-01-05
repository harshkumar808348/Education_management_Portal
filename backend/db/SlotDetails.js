import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    date: {
      type: String,
      required: [true, 'Date is required']
    },
    time: {
      type: String,
      required: [true, 'Time is required']
    },
    teacherId: {
      type: String,
      required: [true, 'Teacher ID is required'],
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
  });
  
export const Booking = mongoose.model('Booking', bookingSchema);