const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    service_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceType",
      required: true
    },

    assigned_mover_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    assigned_company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null
    },

    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null
    },

    pickup_address: {
      type: String,
      required: true
    },

    pickup_lat: {
      type: Number,
      default: null,
      min: -90,
      max: 90
    },

    pickup_lng: {
      type: Number,
      default: null,
      min: -180,
      max: 180
    },

    dropoff_address: {
      type: String,
      required: true
    },

    dropoff_lat: {
      type: Number,
      default: null,
      min: -90,
      max: 90
    },

    dropoff_lng: {
      type: Number,
      default: null,
      min: -180,
      max: 180
    },

    scheduled_time: {
      type: Date,
      default: null
    },

    distance_km: {
      type: Number,
      default: null,
      min: 0
    },

    estimated_duration_minutes: {
      type: Number,
      default: null,
      min: 0
    },

    service_notes: {
      type: String,
      default: null
    },

    price_estimate: {
      type: Number,
      default: 0,
      min: 0
    },

    final_price: {
      type: Number,
      default: null,
      min: 0
    },

    status: {
      type: String,
      enum: ['pending','matched','accepted','in_progress','completed','cancelled','failed'],
      default: 'pending'
    },

    customer_confirmed_completion: {
      type: Boolean,
      default: false
    },

    completed_at: {
      type: Date,
      default: null
    },

    cancelled_at: {
      type: Date,
      default: null
    },

    cancel_reason: {
      type: String,
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);