const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  job_title: { type: String, required: true },
  job_type: String,
  no_of_positions: Number,
  state: String,
  target_hiring_date: Date,
  compensation_type: String,
  compensation_range_from: Number,
  compensation_range_to: Number,
  job_description: { type: String, required: true },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  experience: {
    type: String,
    required: true
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  }
 
});

module.exports = mongoose.model('Job', jobSchema);
