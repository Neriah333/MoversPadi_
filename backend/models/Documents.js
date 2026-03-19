const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null
    },

    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null
    },

    document_type: {
      type: String,
      enum: [
        'drivers_license',
        'nin',
        'passport',
        'profile_photo',
        'house_picture',
        'vehicle_registration',
        'road_worthiness',
        'insurance',
        'proof_of_ownership',
        'cac_certificate',
        'company_picture',
        'company_signature',
        'guarantor_id',
        'other'
      ],
      required: true
    },

    file_path: {
      type: String,
      required: true // URL to file (Cloudinary/S3)
    },

    original_name: {
      type: String,
      default: null
    },

    mime_type: {
      type: String,
      default: null
    },

    file_size: {
      type: Number,
      default: null
    },

    file_status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },

    verified_at: {
      type: Date,
      default: null
    },

    reviewed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Document', DocumentSchema);