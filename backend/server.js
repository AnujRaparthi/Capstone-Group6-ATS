require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const jobModel = require('./models/JobModel');
const jobRoutes = require('./api/jobs');
const app = express();


app.use(express.json());
connectDB();

app.use(cors());
app.use('/api', authRoutes);
app.use('/api/jobs', jobRoutes);

// API endpoint to post a new job
app.post('/api/jobs', async (req, res) => {
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

const PORT = process.env.PORT || 5001; 

app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();

    console.log('Jobs='+jobs);
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req, res) => {
    res.send('Career Hunt');
  });