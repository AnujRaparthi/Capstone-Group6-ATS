const mongoose = require('mongoose');

const jobLocationSchema = new mongoose.Schema({
  job_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job', 
    required: true 
  },
  location_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Location', 
    required: true 
  }
});

module.exports = mongoose.model('JobLocation', jobLocationSchema);
