// routes/departments.js
const express = require('express');
const router = express.Router();
const Department = require('../models/DepartmentModel');

router.get('/Department', async (req, res) => {
  try {
    console.log('this is api');
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
