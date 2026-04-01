const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notification = sequelize.define('Notification', {
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
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { notEmpty: true }
  },
  message: {
    type: DataTypes.TEXT, // Using TEXT for longer notification bodies
    allowNull: false,
    validate: { notEmpty: true }
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  delivery_channel: {
    type: DataTypes.ENUM('push', 'sms', 'email', 'in_app'),
    allowNull: false
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sent_at: {
    type: DataTypes.DATE,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'notifications',
  // Indexes are critical here for "Get Unread Count" queries
  indexes: [
    { fields: ['user_id', 'is_read'] }
  ]
});

module.exports = Notification;