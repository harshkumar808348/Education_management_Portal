import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
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

export default mongoose.model("Login", loginSchema);