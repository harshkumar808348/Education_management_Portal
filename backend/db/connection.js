import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Connect to MongoDB using the environment variable
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export default connectDB;
