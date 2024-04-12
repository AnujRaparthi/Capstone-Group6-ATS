// routes/locations.js
const express = require('express');
const router = express.Router();
const Location = require('../models/LocationModel');

router.get('/Location', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;