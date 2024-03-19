// api/jobs.js
const express = require('express');
const jobModel = require('../models/JobModel');
const router = express.Router();

// API endpoint to post a new job
router.post('/', async (req, res) => {
  try {
    const jobData = req.body;
    const newJob = new jobModel(jobData);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save job' });
  }
});

module.exports = router;
