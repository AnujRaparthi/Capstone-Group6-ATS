require('dotenv').config();
const express = require('express');
//const mongoose = require('mongoose');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const Job = require('./models/JobModel');

const app = express();


app.use(express.json());
connectDB();

app.use(cors());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000; 

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