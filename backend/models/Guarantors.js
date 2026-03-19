const mongoose = require('mongoose');

const GuarantorSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    full_name: {
      type: String,
      required: true,
      maxlength: 150,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true
    },

    occupation: {
      type: String,
      maxlength: 150,
      default: null
    },

    means_of_identification: {
      type: String,
      maxlength: 150,
      default: null
    },

    id_document_path: {
      type: String,
      default: null
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('Guarantor', GuarantorSchema);