const mongoose = require('mongoose');

const AdminActionSchema = new mongoose.Schema(
  {
    admin_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    action_type: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true
    },

    target_type: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true
    },

    target_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    reason: {
      type: String,
      default: null,
      trim: true
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false }
  }
);

module.exports = mongoose.model('AdminAction', AdminActionSchema);