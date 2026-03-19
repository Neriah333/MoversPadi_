const mongoose = require('mongoose');

const JobStatusLogSchema = new mongoose.Schema(
  {
    service_request_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true
    },

    status: {
      type: String,
      required: true,
      maxlength: 50
    },

    changed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    note: {
      type: String,
      default: null
    },

    created_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false // we use created_at manually
  }
);

module.exports = mongoose.model('JobStatusLog', JobStatusLogSchema);