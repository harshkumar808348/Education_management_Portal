import express from "express";
import CompetativeExam from "../db/CompetativeExam.js"; // Import the Competitive Exam model
import cloudinary from "../cloudinary/cloudinary.js";
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST Route to add data for Competitive Exam teacher
router.post('/CompetativePannel', upload.single('image'), async (req, res) => {
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
      folder: 'competative_exam_profiles',
    });

    // Create new Competitive Exam document
    const newCompetativeExamData = new CompetativeExam({
      teacherId,
      name,
      email,
      subject,
      description,
      Amount,
      Image: uploadResponse.secure_url
    });

    // Save to MongoDB
    await newCompetativeExamData.save();
    res.status(200).json({ message: "Data updated successfully", imageUrl: uploadResponse.secure_url });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: "Error saving data to MongoDB" });
  }
});

// GET Route to fetch all Competitive Exam teacher data
router.get('/competitive-exams', async (req, res) => {
  try {
    const competativeExamData = await CompetativeExam.find();
    res.status(200).json(competativeExamData);
  } catch (err) {
    console.error('Error retrieving Competitive Exam data:', err);
    res.status(500).json({ message: "Error retrieving data from MongoDB" });
  }
});

export { router };
