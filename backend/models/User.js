const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      maxlength: 150,
      trim: true
    },

    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true
    },

    email: {
      type: String,
      unique: true,
      sparse: true, // allows null but enforces uniqueness when present
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ['pending', 'active', 'suspended', 'rejected'],
      default: 'pending'
    },

    is_active: {
      type: Boolean,
      default: true
    },

    last_login_at: {
      type: Date,
      default: null
    },

    remember_token: {
      type: String,
      default: null
    },

    deleted_at: {
      type: Date,
      default: null
    },

    // 🔐 Verification & reset (your additions — good practice)
    verifyToken: String,
    verifyTokenExpires: Date,
    verifyCode: String,
    verifyCodeExpires: Date,

    isVerified: {
      type: Boolean,
      default: false
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('User', UserSchema);