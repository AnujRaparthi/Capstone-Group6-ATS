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
const userRoutes = require('./routes/userRoutes');
const getjobRoutes = require('./routes/jobRoutes');
const Location = require('./models/LocationModel');
const Department = require('./models/DepartmentModel')
const JobApplication = require('./models/JobApplication');
const stripe = require('stripe')('sk_test_51P3jtODTqZXkpm4po0sAv1FZNbTMxjkkcwl9hDRQYLJwkM2mDqcCIaDlyaJVaUhxZnV0m7hlzrwvXTP29tzOJiCg00F9kPAxvA');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
connectDB();

app.use(cors());
app.use('/api', applicationsRoute);
app.use('/api/jobs', getjobRoutes);
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);

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

//Departments
app.get('/api/Department', async (req, res) => {
  try {
    console.log('this is api');
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST route to add a new department
app.post('/api/Department', async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name });
    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
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

app.get('/api/job-applications', async (req, res) => {

  console.log('Inside applications API');
  try {
    const jobApplications = await JobApplication.find();

    console.log('jobApplications='+jobApplications);
    res.json(jobApplications);
  } catch (error) {
    res.status(500).send(error);
  }
}); 

app.get('/api/job-application/:id', async (req, res) => {

  console.log('Inside Job application api='+req.params.id);
  try {
    const application = await JobApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('api/create-payment-intent', async (req, res) => {
  try {
    const { paymentMethodId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: 9900, // $99 in cents
      currency: 'cad',
      confirmation_method: 'manual',
      confirm: true,
    });

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Inside your Express server routes

app.put('/api/update-application/:applicationId', async (req, res) => {
  const { applicationId } = req.params;
  const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      preferredLocation: req.body.preferredLocation,
      totalWorkExperience: req.body.totalWorkExperience,
      highestEducationalQualification: req.body.highestEducationalQualification,
      stage: req.body.stage,
      status: req.body.status,
  };

  try {
      const updatedApplication = await JobApplication.findByIdAndUpdate(applicationId, updateData, { new: true });
      res.status(200).json(updatedApplication);
  } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).send({ message: "Internal server error while updating application." });
  }
});

// DELETE endpoint for deleting a job application
app.delete('/api/delete-application/:applicationId', async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    const deletedApplication = await JobApplication.findByIdAndDelete(applicationId);

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found." });
    }

    res.status(200).json({ message: "Application deleted successfully." });
  } catch (error) {
    console.error("Failed to delete application:", error);
    res.status(500).json({ message: "Internal server error while deleting application." });
  }
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req, res) => {
    res.send('Career Hunt');
  });