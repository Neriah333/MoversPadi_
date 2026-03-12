const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  service_type: {
    type: String,
    enum: ["dispatch", "haulage", "tow"],
    required: true
  },

  plate_number: {
    type: String,
    required: true,
    unique: true
  },

  vehicle_image: {
    type: String, // stores image URL or file path
    required: true
  },

  drivers_license_image: {
    type: String, // license photo for verification
    required: true
  },

  means_of_identification: {
    type: String,
    enum: ["National ID", "Passport", "Driver License"],
    required: true
  },

  home_address: {
    type: String,
    required: true
  },

  verification_status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  verified: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Vehicle", vehicleSchema);