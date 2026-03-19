const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({

  company_name: {
    type: String,
    required: true
  },

  cac_certificate: {
    type: String,
    required: true
  },

  tin_number: {
    type: String,
    required: true
  },

  fleet_documents: {
    type: [String] // multiple vehicle documents
  },

  insurance_coverage: {
    type: String,
    required: true
  },

  verified_driver_records: {
    type: [String] // driver IDs
  },

  verification_status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = ("Company", companySchema)