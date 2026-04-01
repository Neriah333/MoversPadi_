const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PayoutSplit = sequelize.define('PayoutSplit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  transaction_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // One payout record per transaction
    references: {
      model: 'transactions',
      key: 'id'
    }
  },
  service_request_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'service_requests',
      key: 'id'
    }
  },
  // Using DECIMAL(15, 2) to handle large amounts safely
  gross_amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    validate: { min: 0 }
  },
  admin_commission: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0.00,
    validate: { min: 0 }
  },
  mover_amount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0.00,
    validate: { min: 0 }
  },
  company_amount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0.00,
    validate: { min: 0 }
  },
  payout_status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'payout_splits'
});

module.exports = PayoutSplit;