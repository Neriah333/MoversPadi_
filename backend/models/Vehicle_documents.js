const mongoose = require('mongoose');

const VehicleDocumentsSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
      unique: true // one set of documents per vehicle
    },

    registration_document: {
      type: String,
      default: null // store cloud URL
    },

    road_worthiness_certificate: {
      type: String,
      default: null
    },

    insurance_document: {
      type: String,
      default: null
    },

    inspection_certificate: {
      type: String,
      default: null
    },

    proof_of_ownership: {
      type: String,
      default: null
    },

    uploaded_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('VehicleDocuments', VehicleDocumentsSchema);