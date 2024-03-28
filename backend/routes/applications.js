const express = require('express');
const multer = require('multer');
const JobApplication = require('../models/JobApplication');
const router = express.Router();
const path = require('path');


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.post('/applications', upload.single('resume'), async (req, res) => {
  const { jobId, userId, firstName, lastName, email, preferredLocation, totalWorkExperience, highestEducationalQualification } = req.body;
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  
  try {
    const newApplication = new JobApplication({
      job_id: req.body.jobId,
      applicant_id: req.body.userId, 
      resume_path: req.file.path,
      additionalInfo: {
        firstName,
        lastName,
        email,
        preferredLocation,
        totalWorkExperience,
        highestEducationalQualification,
      },
    });
    
    console.log("Saving application:", newApplication);
    await newApplication.save();
    console.log("Application saved successfully");
    res.status(201).send({ message: 'Application submitted successfully!', newApplicationId: newApplication._id });  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).send({ message: "Internal server error while processing application." });
  }
});

module.exports = router;



// // Apply authMiddleware if the route requires authentication
// // router.post('/applications', authMiddleware, upload.single('resume'), async (req, res) => {
// router.post('/applications', upload.single('resume'), async (req, res) => {
//   console.log("Received jobId:", req.body.jobId);
//   console.log("Received file:", req.file);
//   console.log("Received fields:", Object.keys(req.body));

//   // Validate required fields
//   if (!req.body.jobId || !req.file || !req.user) {
//     console.error("Required fields are missing");
//     return res.status(400).send('Missing required fields');
//   }

//   // Assuming you have an authenticated user via authMiddleware
//   //const userId = req.user._id;

//   try {
//     // Create a new JobApplication document
//     const newApplication = new JobApplication({
//       job_id: req.body.jobId,
//       // Include additional fields as per your schema
//       resume_path: req.file.path,
//       applicant_id: req.user._id, // Uncomment if using authMiddleware
//     });

//     // Save the new job application to the database
//     await newApplication.save();
//     res.send('Application submitted successfully');
//   } catch (error) {
//     console.error("Failed to save the application:", error);
//     res.status(500).send('Server error while saving the application');
//   }
// });

// // Apply authMiddleware if the route requires authentication
// // router.post('/applications', authMiddleware, upload.single('resume'), async (req, res) => {
//   router.post('/applications', upload.single('resume'), async (req, res) => {
//     console.log("Simplified check - Received fields and file:");
//     console.log(req.body); // Log all received form fields
//     console.log(req.file); // Log received file details
  
//     // Temporarily bypass all validations for testing
//     return res.status(200).send('Endpoint reached and data received');
//   });

//module.exports = router;
