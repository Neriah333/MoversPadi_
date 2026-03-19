const mongoose = require('mongoose');

const OtpVerificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null // nullable (guest OTPs allowed)
    },

    phone_or_email: {
      type: String,
      required: true,
      trim: true
    },

    otp_code: {
      type: String,
      required: true,
      maxlength: 10
    },

    channel: {
      type: String,
      enum: ['sms', 'email'],
      required: true
    },

    expires_at: {
      type: Date,
      required: true
    },

    verified_at: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: ['pending', 'verified', 'expired', 'failed'],
      default: 'pending'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('OtpVerification', OtpVerificationSchema);