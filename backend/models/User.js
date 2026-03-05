const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },

  name: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['customer', 'mover', 'admin'],
    required: true,
    default: 'customer'
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  email: {
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
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },

  // OTP / verification
  verifyToken: String,           // for link verification (optional)
  verifyTokenExpires: Date,
  verifyCode: String,            // for numeric OTP verification
  verifyCodeExpires: Date,

  isVerified: {
    type: Boolean,
    default: false
  }

}, { 
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('User', UserSchema);