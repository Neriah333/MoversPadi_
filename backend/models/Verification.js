const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({

  mover_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mover"
  },

  phone_verified: {
    type: Boolean,
    default: false
  },

  email_verified: {
    type: Boolean,
    default: false
  },

  background_screening: {
    type: Boolean,
    default: false
  },

  vehicle_inspection_passed: {
    type: Boolean,
    default: false
  }

});

module.exports = ("Verification", verificationSchema)