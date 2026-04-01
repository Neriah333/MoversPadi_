const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ServiceRequest = sequelize.define('ServiceRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  service_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'service_types', key: 'id' }
  },
  assigned_mover_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: { model: 'users', key: 'id' }
  },
  assigned_company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: { model: 'companies', key: 'id' }
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: { model: 'vehicles', key: 'id' }
  },
  pickup_address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  pickup_lat: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    validate: { min: -90, max: 90 }
  },
  pickup_lng: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    validate: { min: -180, max: 180 }
  },
  dropoff_address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dropoff_lat: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    validate: { min: -90, max: 90 }
  },
  dropoff_lng: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    validate: { min: -180, max: 180 }
  },
  scheduled_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  distance_km: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: { min: 0 }
  },
  estimated_duration_minutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 0 }
  },
  service_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price_estimate: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0.00
  },
  final_price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM(
      'pending', 'matched', 'accepted', 'in_progress', 
      'completed', 'cancelled', 'failed'
    ),
    defaultValue: 'pending'
  },
  customer_confirmed_completion: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cancelled_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cancel_reason: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'service_requests',
  indexes: [
    { fields: ['status'] },
    { fields: ['customer_id'] },
    { fields: ['assigned_mover_id'] }
  ]
});

module.exports = ServiceRequest;