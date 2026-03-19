const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      maxlength: 150,
      trim: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true
    },

    delivery_channel: {
      type: String,
      enum: ['push','sms','email','in_app'],
      required: true
    },

    is_read: {
      type: Boolean,
      default: false
    },

    sent_at: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Notification', NotificationSchema);