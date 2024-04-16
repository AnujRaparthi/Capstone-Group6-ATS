const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  location_name: { type: String, required: true },
  address: String,
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  }
});

module.exports = mongoose.model('Location', locationSchema);
