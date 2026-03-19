const mongoose = require('mongoose');

const SavedLocationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    label: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    lat: {
      type: Number,
      default: null,
      min: -90,
      max: 90
    },

    lng: {
      type: Number,
      default: null,
      min: -180,
      max: 180
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('SavedLocation', SavedLocationSchema);