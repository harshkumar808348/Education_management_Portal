import mongoose from "mongoose";

// Define the schema for Class9 data
const CompetativeExam = new mongoose.Schema({
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
    unique: true
  },
  subject: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,  // Can be a string or text for detailed descriptions
    required: true // Optional field for teacher's description
  },
  amount: {
    type: String,
    required: true
  }
});

export default mongoose.model("CompetativeExam", CompetativeExam); // Ensure this matches the model name used in the backend
