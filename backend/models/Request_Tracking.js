const mongoose = require('mongoose');

const RequestTrackingSchema = new mongoose.Schema(
  {
    service_request_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true
    },

    mover_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
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

    current_address: {
      type: String,
      default: null
    },

    eta_minutes: {
      type: Number,
      default: null,
      min: 0
    },

    tracking_status: {
      type: String,
      enum: [
        'en_route_pickup',
        'arrived_pickup',
        'in_transit',
        'arrived_destination',
        'completed'
      ],
      required: true
    },

    recorded_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('RequestTracking', RequestTrackingSchema);