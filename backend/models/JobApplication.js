const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume_path: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  totalWorkExperience: String,
  highestEducationalQualification: String,
  stage: String,
  status: String,
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },  
  resume_file: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  interview_comments: String,
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
