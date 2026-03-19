const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
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

    service_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceType",
      required: true
    },

    vehicle_type: {
      type: String,
      enum: ['motorcycle','van','truck','tow_truck','private_car','bus'],
      required: true
    },

    brand: {
      type: String,
      maxlength: 100,
      default: null,
      trim: true
    },

    model: {
      type: String,
      maxlength: 100,
      default: null,
      trim: true
    },

    color: {
      type: String,
      maxlength: 50,
      default: null,
      trim: true
    },

    plate_number: {
      type: String,
      maxlength: 50,
      unique: true,
      required: true,
      trim: true
    },

    capacity: {
      type: String,
      maxlength: 100,
      default: null
    },

    year_of_manufacture: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear(),
      default: null
    },

    vehicle_photo: {
      type: String,
      default: null // URL to photo
    },

    status: {
      type: String,
      enum: ['pending','active','inactive','suspended'],
      default: 'pending'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Vehicle', VehicleSchema);