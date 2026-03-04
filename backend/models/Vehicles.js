const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  // Unique identifier
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },

  // Reference to user (owner of vehicle)
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Service type: dispatch, haulage, tow
  service_type: {
    type: String,
    enum: ['dispatch', 'haulage', 'tow'],
    required: true
  },

  // Vehicle details
  plate_number: {
    type: String,
    required: true,
    unique: true
  },

  verified: {
    type: Boolean,
    default: false
  },

  means_of_identification: {
    type: String,
    required: true
  },

  home_address: {
    type: String,
    required: true
  }

}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);