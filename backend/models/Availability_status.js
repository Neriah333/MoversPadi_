const mongoose = require('mongoose');

const AvailabilityStatusSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // one record per user
    },

    is_online: {
      type: Boolean,
      default: false
    },

    is_available: {
      type: Boolean,
      default: false
    },

    current_lat: {
      type: Number,
      default: null,
      min: -90,
      max: 90
    },

    current_lng: {
      type: Number,
      default: null,
      min: -180,
      max: 180
    },

    last_seen_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('AvailabilityStatus', AvailabilityStatusSchema);