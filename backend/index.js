import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connection.js";
import { router as class9Router } from "./Routes/class9routes.js";
import { router as class10Router } from "./Routes/class10routes.js";
import { router as class11Router } from "./Routes/class11routes.js";
import { bookingRouter } from './Routes/SlotRoutes.js';
import PaymentDetails from "./Routes/PaymentDetails.js";
import {router as upscRouter} from "./Routes/Upscroutes.js";
import {router as jeeRouter} from "./Routes/Jeeroutes.js";
import {router as neetRouter} from "./Routes/Neetroutes.js";
import {router as clas12Router} from "./Routes/clas12routes.js";
import {router as competativeRouter} from "./Routes/CompetativeExam.js";
import adminRouter from "./Routes/adminLoginandRegister.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config({
  path: "./.env"
});

const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Public routes
app.use('/educational-services', [
  class9Router,
  class10Router,
  class11Router,
  bookingRouter,
  PaymentDetails,
  upscRouter,
  jeeRouter,
  neetRouter,
  clas12Router,
  competativeRouter
]);

// Auth routes
app.use('/', adminRouter);

// Protected admin routes
app.use('/MainAdmin', authMiddleware, [
  class9Router,
  class10Router,
  class11Router,
  bookingRouter,
  PaymentDetails,
  upscRouter,
  jeeRouter,
  neetRouter,
  clas12Router,
  competativeRouter
]);

// Connect to database
connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: "Token expired" });
  }
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;