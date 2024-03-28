const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume_path: String,
  additionalInfo: {
    firstName: String,
    lastName: String,
    email: String,
    preferredLocation: String,
    totalWorkExperience: String,
    highestEducationalQualification: String,
  },
  stage: String,
  status: String,
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  interview_comments: String
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
