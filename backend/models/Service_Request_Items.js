const mongoose = require('mongoose');

const ServiceRequestItemSchema = new mongoose.Schema(
  {
    service_request_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true
    },

    item_name: {
      type: String,
      required: true,
      maxlength: 150,
      trim: true
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1
    },

    weight: {
      type: Number,
      default: null,
      min: 0
    },

    dimensions: {
      type: String,
      default: null,
      maxlength: 100
    },

    special_instruction: {
      type: String,
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('ServiceRequestItem', ServiceRequestItemSchema);