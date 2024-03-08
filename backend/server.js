require('dotenv').config();
const express = require('express');
//const mongoose = require('mongoose');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();


app.use(express.json());
connectDB();

app.use(cors());
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req, res) => {
    res.send('Career Hunt');
  });