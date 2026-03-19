const mongoose = require('mongoose');

const PayoutSplitSchema = new mongoose.Schema(
  {
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
      unique: true
    },

    service_request_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true
    },

    gross_amount: {
      type: Number,
      required: true,
      min: 0
    },

    admin_commission: {
      type: Number,
      default: 0,
      min: 0
    },

    mover_amount: {
      type: Number,
      default: 0,
      min: 0
    },

    company_amount: {
      type: Number,
      default: 0,
      min: 0
    },

    payout_status: {
      type: String,
      enum: ['pending','processing','completed','failed'],
      default: 'pending'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('PayoutSplit', PayoutSplitSchema);