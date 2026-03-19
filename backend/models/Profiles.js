const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // ensures one profile per user
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: null
    },

    date_of_birth: {
      type: Date,
      default: null
    },

    home_address: {
      type: String,
      default: null
    },

    city: {
      type: String,
      maxlength: 100,
      default: null
    },

    state: {
      type: String,
      maxlength: 100,
      default: null
    },

    country: {
      type: String,
      default: 'Nigeria'
    },

    profile_picture: {
      type: String,
      default: null
    },

    means_of_id_type: {
      type: String,
      enum: ['nin', 'passport', 'drivers_license', 'voters_card', 'other'],
      default: null
    },

    means_of_id_number: {
      type: String,
      maxlength: 100,
      default: null
    },

    selfie_image: {
      type: String,
      default: null
    },

    social_media_link_1: {
      type: String,
      default: null
    },

    social_media_link_2: {
      type: String,
      default: null
    },

    social_media_link_3: {
      type: String,
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Profile', ProfileSchema);