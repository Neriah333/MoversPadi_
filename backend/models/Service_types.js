const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ServiceType = sequelize.define('ServiceType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slug: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isLowercase: true // Ensures URL consistency
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT, // Better for detailed service descriptions
    allowNull: true,
    defaultValue: null
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'service_types'
});

module.exports = ServiceType;