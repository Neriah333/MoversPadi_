const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    service_request_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true
    },

    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    payer_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    currency: {
      type: String,
      default: 'NGN',
      maxlength: 10
    },

    payment_gateway: {
      type: String,
      enum: ['paystack','flutterwave','cash','manual'],
      required: true
    },

    gateway_reference: {
      type: String,
      default: null,
      unique: true,
      maxlength: 150,
      sparse: true // allows null unique
    },

    payment_status: {
      type: String,
      enum: ['pending','successful','failed','refunded','reversed'],
      default: 'pending'
    },

    payment_method: {
      type: String,
      default: null,
      maxlength: 50
    },

    paid_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Transaction', TransactionSchema);