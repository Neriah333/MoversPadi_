const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SupportTicket = sequelize.define('SupportTicket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  service_request_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'service_requests',
      key: 'id'
    }
  },
  subject: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { notEmpty: true }
  },
  message: {
    type: DataTypes.TEXT, // Using TEXT for potentially long support queries
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'in_progress', 'resolved', 'closed'),
    defaultValue: 'open'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  assigned_admin_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'support_tickets',
  indexes: [
    { fields: ['status'] },
    { fields: ['priority'] },
    { fields: ['user_id'] }
  ]
});

module.exports = SupportTicket;