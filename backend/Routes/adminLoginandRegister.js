import express from "express";
import login from "../db/adminloginSchema.js";
import Register from "../db/RegisterTeacher.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env"
});
const router = express.Router();

// Register route
router.post("/adminregister", async (req, res) => {
  try {
    const { Userid, password } = req.body;
    
    if (!Userid || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await login.findOne({ Userid });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new login({
      Userid,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
router.post("/adminlogin", async (req, res) => {
  try {
    const { Userid, password } = req.body;
    
    if (!Userid || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user
    const user = await login.findOne({ Userid });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token (expires in 10 minutes)
    const token = jwt.sign(
      { id: user._id, Userid: user.Userid },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, Userid: user.Userid }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Verify token route
router.get("/verify-token", authMiddleware, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});

// Logout route (optional, since we're handling it client-side)
router.post("/logout", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;