import express from "express";
import Class11 from "../db/Class11.js"; // Import the Class 11 model
import cloudinary from "../cloudinary/cloudinary.js";
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST Route to add data for Class 11 teacher
router.post('/Class11adminPannel', upload.single('image'), async (req, res) => {
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
      folder: 'class11_profiles',
    });

    // Create new Class 11 document
    const newClass11Data = new Class11({
      teacherId,
      name,
      email,
      subject,
      description,
      Amount,
      Image: uploadResponse.secure_url
    });

    // Save to MongoDB
    await newClass11Data.save();
    res.status(200).json({ message: "Data updated successfully", imageUrl: uploadResponse.secure_url });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: "Error saving data to MongoDB" });
  }
});

// GET Route to fetch all Class 11 teacher data
router.get('/class11', async (req, res) => {
  try {
    const class11Data = await Class11.find();
    res.status(200).json(class11Data);
  } catch (err) {
    console.error('Error retrieving Class 11 data:', err);
    res.status(500).json({ message: "Error retrieving data from MongoDB" });
  }
});

export { router };
