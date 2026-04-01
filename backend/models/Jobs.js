import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  mover_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Null until a mover accepts the job
    references: {
      model: 'users',
      key: 'id'
    }
  },
  service_type: {
    type: DataTypes.ENUM('dispatch', 'haulage', 'tow'),
    allowNull: false
  },
  // GPS Coordinates: 9 total digits, 6 after decimal for high precision
  pickup_lat: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true
  },
  pickup_lng: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true
  },
  dropoff_lat: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true
  },
  dropoff_lng: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true
  },
  // Financials: 10 total digits, 2 for cents
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  commission: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'in_progress', 'completed'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'jobs'
});

export default Job;