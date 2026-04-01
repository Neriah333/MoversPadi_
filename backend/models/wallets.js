const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Wallet = sequelize.define('Wallet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  wallet_type: {
    type: DataTypes.ENUM('admin_commission', 'mover_earnings', 'company_earnings', 'customer_refund'),
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(15, 2), // Exact precision for financial tracking
    defaultValue: 0.00,
    validate: { min: 0 }
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'NGN'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),
    defaultValue: 'active'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'wallets',
  indexes: [
    { fields: ['user_id'] },
    { fields: ['company_id'] },
    { fields: ['wallet_type'] }
  ]
});

module.exports = Wallet;