import express from "express";
import JEE from "../db/Jee.js"; // Import the JEE model
import cloudinary from "../cloudinary/cloudinary.js";
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST Route to add data for JEE teacher
router.post('/JeeAdminPanel', upload.single('image'), async (req, res) => {
  const { teacherId, name, email, subject, description, Amount } = req.body;

  // Validate input fields
  if (!teacherId || !name || !email || !subject || !Amount || !req.file) {
    return res.status(400).json({ message: "All fields are required, including image." });
  }


  try {
    // Convert image buffer to base64
    const fileStr = req.file.buffer.toString('base64');
    const fileType = req.file.mimetype;
    const dataUri = `data:${fileType};base64,${fileStr}`;

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: 'jee_profiles',
    });

    // Create new JEE document
    const newJEEData = new JEE({
      teacherId,
      name,
      email,
      subject,
      description,
      Amount,
      Image: uploadResponse.secure_url,
    });

    // Save to MongoDB
    await newJEEData.save();
    res.status(200).json({ message: "Data updated successfully", imageUrl: uploadResponse.secure_url });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: "Error saving data to MongoDB" });
  }
});

// GET Route to fetch all JEE teacher data
router.get('/jee', async (req, res) => {
  try {
    const jeeData = await JEE.find();
    res.status(200).json(jeeData);
  } catch (err) {
    console.error('Error retrieving JEE data:', err);
    res.status(500).json({ message: "Error retrieving data from MongoDB" });
  }
});

export { router };
