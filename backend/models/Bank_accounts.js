const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BankAccount = sequelize.define('BankAccount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Link to User
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  // Link to Company
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'Companies',
      key: 'id'
    }
  },
  bank_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { notEmpty: true }
  },
  account_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { notEmpty: true }
  },
  // String is better than BigInt for account numbers to preserve leading zeros
  account_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: { notEmpty: true }
  },
  bank_code: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: null
  },
  is_primary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'bank_accounts',
  // Optional: Ensure at least one owner exists at the DB level
  validate: {
    eitherUserOrCompany() {
      if (!this.user_id && !this.company_id) {
        throw new Error('Bank account must belong to either a User or a Company');
      }
    }
  }
});

module.exports = BankAccount;