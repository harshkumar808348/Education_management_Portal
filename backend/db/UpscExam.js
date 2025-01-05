import mongoose from "mongoose";

// Define the schema for UPSC admin data
const upscSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: true, // Ensure this is a required field
    unique: true,   // Makes sure teacherId is unique
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true
  },
  Image: {
    type: String,
    required: true
  },
  description: {
    type: String,  // Can be a string or text for detailed descriptions
    required: true // Optional field for teacher's description
  },
  Amount: {
    type: String,
    required: true
  }
});

export default mongoose.model("UPSC", upscSchema); // Ensure this matches the model name used in the backend
