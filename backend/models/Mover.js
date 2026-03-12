const mongoose = require("mongoose");

const moverSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  id_document: {
    type: String, // NIN or Driver's license image
    required: true
  },

  vehicle_registration_doc: {
    type: String,
    required: true
  },

  road_worthiness_certificate: {
    type: String,
    required: true
  },

  insurance_policy: {
    type: String,
    required: true
  },

  passport_photo: {
    type: String,
    required: true
  },

  bank_account_name: {
    type: String,
    required: true
  },

  bank_account_number: {
    type: String,
    required: true
  },

  bank_name: {
    type: String,
    required: true
  },

  verification_status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Mover", moverSchema)