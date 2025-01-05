import express from 'express';
import { Booking } from "../db/SlotDetails.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config({
    path: "./.env"
});

const router = express.Router();

// Create transporter outside route handler for reuse
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
});

// Validate time format
const isValidTime = (hour, minute, period) => {
  const numHour = parseInt(hour);
  const numMinute = parseInt(minute);
  return (
    numHour >= 1 && 
    numHour <= 12 && 
    numMinute >= 0 && 
    numMinute <= 59 && 
    ['AM', 'PM'].includes(period.toUpperCase())
  );
};

// Create booking with email confirmation
router.post('/save-booking', async (req, res) => {
  try {
    const { name, email, date, hour, minute, period, teacherId } = req.body;

    // Validate required fields including teacherId
    if (!name || !email || !date || !hour || !minute || !period || !teacherId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required including Teacher ID'
      });
    }

    // Validate time format
    if (!isValidTime(hour, minute, period)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time format'
      });
    }

    const time = `${hour}:${minute.padStart(2, '0')} ${period.toUpperCase()}`;
    
    const newBooking = new Booking({
      teacherId,  // Add teacherId to the booking
      name,
      email,
      date,
      time
    });

    await newBooking.save();

    // Send confirmation email with teacher ID
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Booking Confirmation - Your Slot is Reserved!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4CAF50;">Congratulations! Your Booking is Confirmed</h2>
            <p>Dear ${name},</p>
            <p>Thank you for booking with us. Here are your booking details:</p>
            <ul style="list-style-type: none; padding: 0;">
              <li><strong>Teacher ID:</strong> ${teacherId}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${time}</li>
            </ul>
            <p style="color: #666;">Our respective team will connect with you shortly.</p>
            <p style="margin-top: 20px;">Best regards,<br>Your Support Team</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with the response even if email fails
    }

    res.status(201).json({ 
      success: true, 
      message: 'Booking saved successfully. Check your email for confirmation.' 
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your booking' 
    });
  }
});

// GET route to fetch all bookings
router.get('/get-bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while fetching bookings' 
    });
  }
});

export { router as bookingRouter };