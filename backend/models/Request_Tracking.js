const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RequestTracking = sequelize.define('RequestTracking', {
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
  mover_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  // GPS Precision: 9 total digits, 6 after decimal
  current_lat: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    validate: { min: -90, max: 90 }
  },
  current_lng: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    validate: { min: -180, max: 180 }
  },
  current_address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  eta_minutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 0 }
  },
  tracking_status: {
    type: DataTypes.ENUM(
      'en_route_pickup',
      'arrived_pickup',
      'in_transit',
      'arrived_destination',
      'completed'
    ),
    allowNull: false
  },
  recorded_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'request_trackings',
  // Indexing for high-frequency location lookups
  indexes: [
    { fields: ['service_request_id'] },
    { fields: ['mover_id'] }
  ]
});

module.exports = RequestTracking;