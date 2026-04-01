const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  service_request_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'service_requests',
      key: 'id'
    }
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  payer_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2), // Standard precision for financial data
    allowNull: false,
    validate: { min: 0 }
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'NGN'
  },
  payment_gateway: {
    type: DataTypes.ENUM('paystack', 'flutterwave', 'cash', 'manual'),
    allowNull: false
  },
  gateway_reference: {
    type: DataTypes.STRING(150),
    unique: true, // Crucial: prevents duplicate processing
    allowNull: true,
    defaultValue: null
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'successful', 'failed', 'refunded', 'reversed'),
    defaultValue: 'pending'
  },
  payment_method: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: null
  },
  paid_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'transactions',
  indexes: [
    { fields: ['payment_status'] },
    { fields: ['gateway_reference'] }
  ]
});

module.exports = Transaction;