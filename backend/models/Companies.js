const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // one company per user
    },

    company_name: {
      type: String,
      required: true,
      maxlength: 150,
      trim: true
    },

    official_email: {
      type: String,
      unique: true,
      sparse: true, // allows null but enforces uniqueness when present
      lowercase: true,
      trim: true
    },

    official_phone: {
      type: String,
      required: true,
      trim: true
    },

    cac_number: {
      type: String,
      unique: true,
      sparse: true,
      maxlength: 100
    },

    tin_number: {
      type: String,
      maxlength: 100,
      default: null
    },

    address: {
      type: String,
      required: true
    },

    city: {
      type: String,
      maxlength: 100,
      default: null
    },

    state: {
      type: String,
      maxlength: 100,
      default: null
    },

    logo: {
      type: String,
      default: null
    },

    company_picture: {
      type: String,
      default: null
    },

    signature_path: {
      type: String,
      default: null
    },

    fleet_size: {
      type: Number,
      default: 0,
      min: 0
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'pending'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Company', CompanySchema);