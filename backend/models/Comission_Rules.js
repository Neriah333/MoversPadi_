const mongoose = require('mongoose');

const CommissionRuleSchema = new mongoose.Schema(
  {
    service_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceType",
      required: true
    },

    commission_type: {
      type: String,
      enum: ['percentage','flat_fee'],
      required: true
    },

    commission_value: {
      type: Number,
      required: true,
      min: 0
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('CommissionRule', CommissionRuleSchema);