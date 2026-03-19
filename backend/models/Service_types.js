const mongoose = require('mongoose');

const ServiceTypeSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
      trim: true
    },

    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
      trim: true
    },

    description: {
      type: String,
      default: null
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('ServiceType', ServiceTypeSchema);