const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AvailabilityStatus = sequelize.define('AvailabilityStatus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // One record per user
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  is_online: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // Coordinates: 9 total digits, 6 after the decimal point
  // This provides sub-meter accuracy
  current_lat: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    defaultValue: null,
    validate: {
      min: -90,
      max: 90
    }
  },
  current_lng: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    defaultValue: null,
    validate: {
      min: -180,
      max: 180
    }
  },
  last_seen_at: {
    type: DataTypes.DATE,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'availability_statuses'
});

module.exports = AvailabilityStatus;