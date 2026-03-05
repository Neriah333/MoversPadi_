const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Unique identifier
  id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },

  // User details
  name: {
    type: String,
    required: true
  },
  // User role: customer, mover, company
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

  // User status (active, inactive, suspended, etc.)
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },

  // OTP for verification
  otp: {
    code: String,
    expiresAt: Date
  },

  isVerified: {
    type: Boolean,
    default: false
  }

}, { 
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('User', UserSchema);