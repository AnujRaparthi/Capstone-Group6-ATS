const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  }
});

module.exports = mongoose.model('Department', departmentSchema);
