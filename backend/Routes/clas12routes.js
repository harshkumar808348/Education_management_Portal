import express from "express";
import Class12 from "../db/Class12.js"; // Import the Class 12 model
import cloudinary from "../cloudinary/cloudinary.js";
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST Route to add data for Class 12 teacher
router.post('/Class12AdminPanel', upload.single('image'), async (req, res) => {
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
      folder: 'class12_profiles',
    });

    // Create new Class 12 document
    const newClass12Data = new Class12({
      teacherId,
      name,
      email,
      subject,
      description,
      Amount,
      Image: uploadResponse.secure_url
    });

    // Save to MongoDB
    await newClass12Data.save();
    res.status(200).json({ message: "Data updated successfully", imageUrl: uploadResponse.secure_url });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: "Error saving data to MongoDB" });
  }
});

// GET Route to fetch all Class 12 teacher data
router.get('/class12-exams', async (req, res) => {
  try {
    const class12Data = await Class12.find();
    res.status(200).json(class12Data);
  } catch (err) {
    console.error('Error retrieving Class 12 data:', err);
    res.status(500).json({ message: "Error retrieving data from MongoDB" });
  }
});

export { router };
