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
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        if (!user) {
          return res.status(404).send({ error: 'User not found' });
        }
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //   return res.status(401).send({ error: 'Invalid credentials' });
        // }
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ user, token });
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ error: 'Internal server error' });
      }
  });
  
  module.exports = router;
  