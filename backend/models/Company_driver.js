const mongoose = require('mongoose');

const CompanyDriverSchema = new mongoose.Schema(
  {
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    driver_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    assigned_vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null // driver may not have a vehicle yet
    },

    employment_status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

module.exports = mongoose.model('CompanyDriver', CompanyDriverSchema);