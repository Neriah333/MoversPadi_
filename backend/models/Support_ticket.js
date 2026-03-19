const mongoose = require('mongoose');

const SupportTicketSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    service_request_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      default: null
    },

    subject: {
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

    status: {
      type: String,
      enum: ['open','in_progress','resolved','closed'],
      default: 'open'
    },

    priority: {
      type: String,
      enum: ['low','medium','high','urgent'],
      default: 'medium'
    },

    assigned_admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('SupportTicket', SupportTicketSchema);