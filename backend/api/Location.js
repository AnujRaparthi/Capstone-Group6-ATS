// // routes/locations.js
// const express = require('express');
// const router = express.Router();
// const Location = require('../models/LocationModel');

// router.get('/Location', async (req, res) => {
//   try {
//     const locations = await Location.find();
//     res.json(locations);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Location = require('../models/LocationModel');

// Updated Location API to filter by company_id
router.get('/Location', async (req, res) => {
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

module.exports = router;
