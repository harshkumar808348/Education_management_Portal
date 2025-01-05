import express from "express";
import UPSC from "../db/UpscExam.js"; // Import the UPSC model
import cloudinary from "../cloudinary/cloudinary.js";
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST Route to add data for UPSC teacher
router.post('/UpscAdminPanel', upload.single('image'), async (req, res) => {
  const { teacherId, name, email, subject, description, Amount } = req.body;

  // Validate input fields
  if (!teacherId || !name || !email || !subject || !req.file || !Amount) {
    return res.status(400).json({ message: "All fields are required, including image." });
  }

  try {
    // Convert image buffer to base64
    const fileStr = req.file.buffer.toString('base64');
    const fileType = req.file.mimetype;
    const dataUri = `data:${fileType};base64,${fileStr}`;

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: 'upsc_profiles',
    });

    // Create new UPSC document
    const newUPSCData = new UPSC({
      teacherId,
      name,
      email,
      subject,
      description,
      Amount,
      Image: uploadResponse.secure_url
    });

    // Save to MongoDB
    await newUPSCData.save();
    res.status(200).json({ message: "Data updated successfully", imageUrl: uploadResponse.secure_url });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: "Error saving data to MongoDB" });
  }
});

// GET Route to fetch all UPSC teacher data
router.get('/upsc-exams', async (req, res) => {
  try {
    const upscData = await UPSC.find();
    res.status(200).json(upscData);
  } catch (err) {
    console.error('Error retrieving UPSC data:', err);
    res.status(500).json({ message: "Error retrieving data from MongoDB" });
  }
});

export { router };
