const mongoose = require('mongoose');

const CompanyVerificationSchema = new mongoose.Schema(
  {
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      unique: true // one verification per company
    },

    cac_certificate_path: {
      type: String,
      default: null
    },

    company_picture_path: {
      type: String,
      default: null
    },

    signature_path: {
      type: String,
      default: null
    },

    representative_name: {
      type: String,
      maxlength: 150,
      default: null
    },

    representative_phone: {
      type: String,
      maxlength: 20,
      default: null
    },

    representative_id_type: {
      type: String,
      enum: ['nin', 'passport', 'drivers_license', 'voters_card', 'other'],
      default: null
    },

    representative_id_number: {
      type: String,
      maxlength: 100,
      default: null
    },

    verification_status: {
      type: String,
      enum: [
        'pending',
        'approved',
        'rejected',
        'resubmission_required',
        'suspended'
      ],
      default: 'pending'
    },

    submitted_at: {
      type: Date,
      default: null
    },

    reviewed_at: {
      type: Date,
      default: null
    },

    reviewed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    rejection_reason: {
      type: String,
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('CompanyVerification', CompanyVerificationSchema);