import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  Userid:{
    type: String,
    required: true,
    unique: true
  } , 
  password :{
    type: String,
    required: true
  },

})

export default mongoose.model("Register", registerSchema);