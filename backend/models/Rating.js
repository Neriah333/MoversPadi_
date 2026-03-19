const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema(
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

    rated_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    rated_company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    review: {
      type: String,
      default: null,
      trim: true
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Rating', RatingSchema);