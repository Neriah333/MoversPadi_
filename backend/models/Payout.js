const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Payout = sequelize.define('Payout', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: { model: 'users', key: 'id' }
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: { model: 'companies', key: 'id' }
  },
  transaction_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'transactions', key: 'id' }
  },
  payout_split_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'payout_splits', key: 'id' }
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2), // Standard for fintech amounts
    allowNull: false,
    validate: { min: 0 }
  },
  payout_reference: {
    type: DataTypes.STRING(150),
    unique: true,
    allowNull: true,
    defaultValue: null
  },
  payout_method: {
    type: DataTypes.ENUM('bank_transfer', 'wallet_balance', 'manual'),
    defaultValue: 'wallet_balance'
  },
  payout_status: {
    type: DataTypes.ENUM('pending', 'processing', 'successful', 'failed'),
    defaultValue: 'pending'
  },
  processed_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'payouts'
});

module.exports = Payout;