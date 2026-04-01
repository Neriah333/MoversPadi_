const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CompanyDriver = sequelize.define('CompanyDriver', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'companies', // Matches the table name for Company
      key: 'id'
    }
  },
  driver_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Matches the table name for User
      key: 'id'
    }
  },
  assigned_vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'vehicles', // Matches the table name for Vehicle
      key: 'id'
    }
  },
  employment_status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),
    defaultValue: 'active'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'company_drivers'
});

module.exports = CompanyDriver;