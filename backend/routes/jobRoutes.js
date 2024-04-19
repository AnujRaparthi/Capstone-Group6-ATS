const express = require('express');
const Job = require('../models/JobModel'); 

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('location_id').populate('department_id').populate('company_id');
    if (!job) {
      return res.status(404).send('Job not found');
    }
    res.json(job);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
