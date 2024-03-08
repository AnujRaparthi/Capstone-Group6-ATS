const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  location_name: { type: String, required: true },
  address: String
});

module.exports = mongoose.model('Location', locationSchema);
