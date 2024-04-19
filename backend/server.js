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
const Company = require('./models/CompanyModel');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
connectDB();

// // Specify the origin to be allowed
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));

// // Enable pre-flight across-the-board
// app.options('*', cors(corsOptions)); // include before other routes

app.use(cors());
app.use('/api', applicationsRoute);
app.use('/api/jobs', getjobRoutes);
app.use('/api', authRoutes);
app.use('/api/users', userRoutes);

console.log('Before jobRoutes');
app.use('/api', jobRoutes);
console.log('After jobRoutes'); 


const PORT = process.env.PORT || 5001; 

// app.get('/api/jobs', async (req, res) => {
//   try {
//     const jobs = await Job.find();

//     console.log('Jobs='+jobs);
//     res.json(jobs);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }); 

app.get('/api/jobs', async (req, res) => {
  const { company_id } = req.query; // Extract company_id from the query parameters, if available

  try {
    const query = {};
    if (company_id) {
      query.company_id = company_id; // If a company_id is provided, filter the jobs by this company_id
    }

    const jobs = await Job.find(query).populate('location_id').populate('department_id').populate('company_id'); // Fetch jobs with or without the company_id filter
    console.log('Jobs=', jobs);
    res.json(jobs);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    res.status(500).send(error);
  }
});

app.get('/api/users', async (req, res) => {
  const { company_id } = req.query; // Extract company_id from query parameters, if available

  try {
    const query = {};
    if (company_id) {
      query.company_id = company_id; // If a company_id is provided, filter users by this company_id
    }

    const users = await User.find(query); // Fetch users with or without the company_id filter
    console.log('Users=', users);
    res.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);
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

  const { company_id } = req.query; // Extract company_id from the query parameters, if available
  
  try {
    const query = {};
    if (company_id) {
      query.company_id = company_id; // If a company_id is provided, filter the locations by this company_id
    }

    const locations = await Location.find(query); // Fetch locations with or without the company_id filter
    res.json(locations);
  } catch (err) {
    console.error('Failed to fetch locations:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST route to add a new location
app.post('/api/Location', async (req, res) => {
  try {
    const { location_name, address , company_id} = req.body;
    const newLocation = new Location({ location_name, address ,company_id});
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/create-job', async (req, res) => {
  try {
    const jobData = req.body;
    console.log('jobData='+jobData);
    const newJob = new Job(jobData);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save job', reason: err.message });
  }
});

//Departments
app.get('/api/Department', async (req, res) => {
  // try {
  //   const departments = await Department.find();
  //   res.json(departments);
  // } catch (error) {
  //   res.status(500).send(error);
  // }

  const { company_id } = req.query; // Extract company_id from the query parameters, if available

  try {
    const query = {};
    if (company_id) {
      query.company_id = company_id; // If a company_id is provided, filter the departments by this company_id
    }

    const departments = await Department.find(query); // Fetch departments with or without the company_id filter
    res.json(departments);
  } catch (error) {
    console.error('Failed to fetch departments:', error);
    res.status(500).send(error);
  }
});

// POST route to add a new department
app.post('/api/Department', async (req, res) => {
  try {
    const { name, company_id } = req.body;
    const newDepartment = new Department({ name, company_id });
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
  const { email, content } = req.body;

  console.log('content=',content);

  try {
    await transporter.sendMail({
      from: '"CareerHunt ATS" <careerhunt.ats@gmail.com>',
      to: email, // Recipient email from the request
      subject: "New notification on your job application",
      html: content,
    });

    res.send({ message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Error sending email' });
  }
});

// app.get('/api/job-applications', async (req, res) => {

//   console.log('Inside applications API');
//   try {
//     const jobApplications = await JobApplication.find();

//     console.log('jobApplications='+jobApplications);
//     res.json(jobApplications);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }); 

app.get('/api/job-applications', async (req, res) => {
  const { company_id } = req.query; // Get company_id from query parameters
  console.log('Inside applications API company_id=',company_id);
  
  try {
    const query = {};
    if (company_id) {
      query.company_id = company_id;
    }

    // Populate the 'job' field, assuming 'job_id' is the reference to the Job model
    const jobApplications = await JobApplication.find(query)
      .populate({
        path: 'job_id', // the field in JobApplication that references Job
        select: 'job_title' // only fetch the job_title from the Job document
      });

    console.log('JobApplications with Job Titles:', jobApplications);
    res.json(jobApplications.map(app => ({
      ...app.toObject(), // convert mongoose document to object
      jobTitle: app.job_id ? app.job_id.job_title : 'No Job Title' // safeguard against null job_id
    })));
  } catch (error) {
    console.error('Failed to fetch job applications:', error);
    res.status(500).send(error);
  }
});

app.get('/api/my-job-applications', async (req, res) => {
  const { applicant_id } = req.query;

  try {
    const applications = await JobApplication.find({ applicant_id: applicant_id }, '-resume_file') // Using '-' to exclude the resume_file
      .populate('job_id') // Assuming you want to populate details about the job
      .populate({
        path: 'job_id',
        populate: { path: 'location_id department_id company_id' } // Deep populate if necessary
      });
    res.json(applications);
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/job-application/:id', async (req, res) => {

  console.log('Inside Job application api='+req.params.id);
  try {
    const application = await JobApplication.findById(req.params.id)
      .populate({
        path: 'job_id',
        populate: {
          path: 'company_id location_id',
          select: 'name location_name' // Adjust fields based on your Company and Location schema
        }
      });

    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/jobdetail/:id', async (req, res) => {

  console.log('Inside Job application api='+req.params.id);
  try {
    const application = await Job.findById(req.params.id).populate('location_id').populate('department_id').populate('company_id');

    if (!application) {
      return res.status(404).json({ message: 'Job not found' });
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

// DELETE endpoint for deleting a job application
app.delete('/api/delete-job/:jobId', async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error("Failed to delete Job:", error);
    res.status(500).json({ message: "Internal server error while deleting Job." });
  }
});


app.put('/api/update-job/:jobId', async (req, res) => {
  const { jobId } = req.params;
  const updateData = {
    job_title: req.body.job_title,
    job_type: req.body.job_type,
    no_of_positions: req.body.no_of_positions,
    state: req.body.state,
    target_hiring_date: req.body.target_hiring_date,
    compensation_type: req.body.compensation_type,
    compensation_range_from: req.body.compensation_range_from,
    compensation_range_to: req.body.compensation_range_to,
    job_description: req.body.job_description,
    experience: req.body.experience,
    location_id: req.body.location_id,
    company_id: req.body.company_id
  };

  try {

    console.log('updateData=',updateData);
    const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
    if (updatedJob) {
      res.status(200).json(updatedJob);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).send({ message: "Internal server error while updating the job." });
  }
});

app.post('/api/register-company', async (req, res) => {
  try {
    const { name, address } = req.body;
    const companyObj = {
      name: name,
      address:address
    };
    console.log('Inside Register Company=',name);
    const company = new Company(companyObj);
    await company.save();
    res.status(201).send(company);
  } catch (error) {
    console.error('Company registration error:', error);
    res.status(400).send({ error: 'Failed to register company.' });
  }
});

app.patch('/api/users/toggle-active/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.active = !user.active;  // Toggle the active status
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/create-checkout-session', async (req, res) => {
  const { priceId, userData } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription', // assuming you're using one-time prices now
      success_url: `http://localhost:5001/api/process-payment?session_id={CHECKOUT_SESSION_ID}`, // Endpoint to handle post-payment processing
      cancel_url: `${req.headers.origin}/payment-failed`,
      metadata: {
        name: userData.name,
        email: userData.email,
        password: userData.password, // Consider security implications
        address: userData.address,
        gender: userData.gender,
        companyName: userData.companyName,
        companyAddress: userData.companyAddress
      }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe session creation failed:', error);
    res.status(400).send({ error: { message: error.message } });
  }
});

app.get('/api/process-payment', async (req, res) => {
  const sessionId = req.query.session_id;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      // Extract user and company data from session metadata
      const { name, email, password, address, gender, companyName, companyAddress } = session.metadata;

      // Process company registration
      const company = new Company({ name: companyName, address: companyAddress });
      await company.save();

      // Process user registration
      const user = new User({ name, email, password, address, gender, userType: 'recruiter', company_id: company._id });
      await user.save();

      res.redirect('http://localhost:3000/login'); // Or send a response that triggers a redirect on the frontend
    } else {
      res.redirect('/payment-failed');
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(400).send({ error: 'Payment processing failed.' });
  }
});




// This is an Express route in your backend
// app.post('/create-checkout-session', async (req, res) => {
//   const { priceId } = req.body; // You'd configure this according to your price setup in Stripe Dashboard
//   try {
//       const session = await stripe.checkout.sessions.create({
//           payment_method_types: ['card'],
//           line_items: [{
//               price: 'price_1P7KyxDTqZXkpm4p3p2M6VSl', // This is a predefined product/price ID in your Stripe Dashboard
//               quantity: 1,
//           }],
//           mode: 'payment',
//           success_url: `/login`,
//           cancel_url: `/payment-failed`,
//       });
//       res.json({ sessionId: session.id });
//   } catch (error) {
//       res.status(400).send({ error: { message: error.message } });
//   }
// });

// app.post('/create-checkout-session', async (req, res) => {
//   const { priceId } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price: priceId, // Using the passed priceId dynamically
//         quantity: 1,
//       }],
//       mode: 'subscription',
//       success_url: `${req.headers.origin}/login?session_id={CHECKOUT_SESSION_ID}`, // Use actual URLs where your frontend is hosted
//       cancel_url: `${req.headers.origin}/payment-failed`,
//     });

//     res.json({ sessionId: session.id });
//   } catch (error) {
//     console.error('Stripe session creation failed:', error);
//     res.status(400).send({ error: { message: error.message } });
//   }
// });



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req, res) => {
    res.send('Career Hunt');
  });