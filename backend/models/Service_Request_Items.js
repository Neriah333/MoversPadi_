const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ServiceRequestItem = sequelize.define('ServiceRequestItem', {
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
    },
    onDelete: 'CASCADE'
  },
  item_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { notEmpty: true }
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: { min: 1 }
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2), // Using decimal for precise weight (kg/lbs)
    allowNull: true,
    defaultValue: null,
    validate: { min: 0 }
  },
  dimensions: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  special_instruction: {
    type: DataTypes.TEXT, // Better for long or detailed instructions
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'service_request_items'
});

module.exports = ServiceRequestItem;