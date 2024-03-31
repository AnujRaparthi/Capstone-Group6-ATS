require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const User = require('./models/User')
const Job = require('./models/JobModel');
const jobRoutes = require('./api/jobs');
const applicationsRoute = require('./routes/applications')
const getjobRoutes = require('./routes/jobRoutes');
const Location = require('./models/LocationModel');

const app = express();


app.use(express.json());
connectDB();

app.use(cors());
app.use('/api', applicationsRoute);
app.use('/api/jobs', getjobRoutes);
app.use('/api', authRoutes);

console.log('Before jobRoutes');
app.use('/api', jobRoutes);
console.log('After jobRoutes'); 


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

app.get('/api/validate-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Invalid token' });
    }
    res.send({ valid: true, userId: decoded.userId });
  });
});


// locations
app.get('/api/Location', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST route to add a new location
app.post('/api/Location', async (req, res) => {
  try {
    const { location_name, address } = req.body;
    const newLocation = new Location({ location_name, address });
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(500).send(error);
  }
});

const nodemailer = require('nodemailer');

// Configure your SMTP mail server here
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'careerhunt.ats@gmail.com',
    pass: 'nrhm jhyb gwyb nbfq',
  },
});
//App Password - nrhm jhyb gwyb nbfq

app.post('/api/send-email', async (req, res) => {
  const { email, comment } = req.body;

  try {
    await transporter.sendMail({
      from: '"CareerHunt ATS" <careerhunt.ats@gmail.com>',
      to: email, // Recipient email from the request
      subject: "New Comment on Your Application",
      text: comment,
      html: `<p>${comment}</p>`,
    });

    res.send({ message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Error sending email' });
  }
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req, res) => {
    res.send('Career Hunt');
  });