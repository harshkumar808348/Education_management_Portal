import express from "express";
import Class9 from "../db/RegisterTeacher.js";
import cloudinary from "../cloudinary/cloudinary.js";
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST Route to add data for Class 9 teacher
router.post('/Class9adminPannel', upload.single('image'), async (req, res) => {
  const { teacherId, name, email, subject, description , Amount } = req.body;

  // Validate input fields
  if (!teacherId || !name || !email || !subject  || !req.file || !Amount) {
    return res.status(400).json({ message: "All fields are required, including image." });
  }

  try {
    // Convert image buffer to base64
    const fileStr = req.file.buffer.toString('base64');
    const fileType = req.file.mimetype;
    const dataUri = `data:${fileType};base64,${fileStr}`;

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: 'class9_profiles',
    });

    // Create new Class9 document
    const newClass9Data = new Class9({
      teacherId,
      name,
      email,
      subject,
      description, 
      Amount,
       // Add description to the document
      Image: uploadResponse.secure_url
    });

    // Save to MongoDB
    await newClass9Data.save();
    res.status(200).json({ message: "Data updated successfully", imageUrl: uploadResponse.secure_url });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: "Error saving data to MongoDB" });
  }
});

// GET Route to fetch all Class 9 teacher data
router.get('/class9', async (req, res) => {
  try {
    const class9Data = await Class9.find();
    res.status(200).json(class9Data);
  } catch (err) {
    console.error('Error retrieving Class 9 data:', err);
    res.status(500).json({ message: "Error retrieving data from MongoDB" });
  }
});
// UPDATE teacher
router.put('/class9/:id', async (req, res) => {
  try {
    const { name, email, subject, teacherId, amount, description } = req.body;
    
    const updatedTeacher = await Class9.findByIdAndUpdate(  // Changed from Class10 to Class9
      req.params.id,
      {
        name,
        email,
        subject,
        teacherId,
        Amount: amount,  // Changed to match your schema
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
router.delete('/class9/:id', async (req, res) => {
  try {
    const deletedTeacher = await Class9.findByIdAndDelete(req.params.id);  // Changed from Class10 to Class9
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting teacher" });
  }
});

export { router };
