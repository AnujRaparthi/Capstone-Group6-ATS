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
router.get('/applications/check-application/:jobId/:userId', async (req, res) => {
  const { jobId, userId } = req.params;
  
  try {
    const existingApplication = await JobApplication.findOne({
      job_id: jobId,
      applicant_id: userId,
    });

    const hasApplied = !!existingApplication;
    res.status(200).json({ hasApplied });
  } catch (error) {
    console.error("Error checking application:", error);
    res.status(500).send({ message: "Internal server error while checking application." });
  }
});

module.exports = router;