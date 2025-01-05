import express from "express";
import Class10 from "../db/Class10.js"; // Ensure Class10 model exists and is correctly implemented
import cloudinary from "../cloudinary/cloudinary.js";
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST Route to add data for Class 10 teacher
router.post('/Class10adminPannel', upload.single('image'), async (req, res) => {
  const { teacherId, name, email, subject, description, amount } = req.body;

  // Validate input fields
  if (!teacherId || !name || !email || !subject || !amount || !req.file) {
    return res.status(400).json({ message: "All fields are required, including image." });
  }

  try {
    // Convert image buffer to base64
    const fileStr = req.file.buffer.toString('base64');
    const fileType = req.file.mimetype;
    const dataUri = `data:${fileType};base64,${fileStr}`;

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: 'class10_profiles', // Ensure this folder exists in Cloudinary
    });

    // Create new Class10 document
    const newClass10Data = new Class10({
      teacherId,
      name,
      email,
      subject,
      description,
      amount, // Convert to uppercase for database if needed
      Image: uploadResponse.secure_url,
    });

    // Save to MongoDB
    await newClass10Data.save();
    res.status(200).json({ message: "Data updated successfully", imageUrl: uploadResponse.secure_url });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: "Error saving data to MongoDB" });
  }
});

// GET Route to fetch all Class 10 teacher data
router.get('/class10', async (req, res) => {
  try {
    const class10Data = await Class10.find(); // Ensure the Class10 model is set up properly
    res.status(200).json(class10Data);
  } catch (err) {
    console.error('Error retrieving Class 10 data:', err);
    res.status(500).json({ message: "Error retrieving data from MongoDB" });
  }
});
// GET single teacher
router.get('/class10/:id', async (req, res) => {
  try {
    const teacher = await Class10.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving teacher data" });
  }
});

// UPDATE teacher
router.put('/class10/:id', async (req, res) => {
  try {
    const { name, email, subject, teacherId, amount, description } = req.body;
    
    const updatedTeacher = await Class10.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        subject,
        teacherId,
        amount,
        description
      },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch (err) {
    res.status(500).json({ message: "Error updating teacher data" });
  }
});

// DELETE teacher
router.delete('/class10/:id', async (req, res) => {
  try {
    const deletedTeacher = await Class10.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting teacher" });
  }
});

export { router };
