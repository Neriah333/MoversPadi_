const mongoose = require('mongoose');

const PayoutSchema = new mongoose.Schema(
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

    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true
    },

    payout_split_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PayoutSplit",
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    payout_reference: {
      type: String,
      default: null,
      unique: true,
      maxlength: 150,
      sparse: true
    },

    payout_method: {
      type: String,
      enum: ['bank_transfer','wallet_balance','manual'],
      default: 'wallet_balance'
    },

    payout_status: {
      type: String,
      enum: ['pending','processing','successful','failed'],
      default: 'pending'
    },

    processed_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Payout', PayoutSchema);