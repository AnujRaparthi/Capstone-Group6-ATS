const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Login route
  router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).send({ error: 'Login failed! Incorrect credentials' });
      }
    //   const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    //   if (!isPasswordMatch) {
    //     return res.status(401).send({ error: 'Login failed. Please check your credentials.' });
    //   }
    
      const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
      res.send({ user, token });
    } catch (error) {
      res.status(400).send({ error: 'Please enter all the fields' });
    }
  });
  
  module.exports = router;
  