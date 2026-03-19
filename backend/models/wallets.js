const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema(
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

    wallet_type: {
      type: String,
      enum: ['admin_commission','mover_earnings','company_earnings','customer_refund'],
      required: true
    },

    balance: {
      type: Number,
      default: 0,
      min: 0
    },

    currency: {
      type: String,
      default: 'NGN',
      maxlength: 10
    },

    status: {
      type: String,
      enum: ['active','inactive','suspended'],
      default: 'active'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Wallet', WalletSchema);