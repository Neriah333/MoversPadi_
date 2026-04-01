const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  service_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'service_types',
      key: 'id'
    }
  },
  vehicle_type: {
    type: DataTypes.ENUM('motorcycle', 'van', 'truck', 'tow_truck', 'private_car', 'bus'),
    allowNull: false
  },
  brand: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  model: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  color: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: null
  },
  plate_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  capacity: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  year_of_manufacture: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1900,
      max: new Date().getFullYear()
    }
  },
  vehicle_photo: {
    type: DataTypes.STRING(500), // Length for Cloudinary/S3 URLs
    allowNull: true,
    defaultValue: null
  },
  status: {
    type: DataTypes.ENUM('pending', 'active', 'inactive', 'suspended'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'vehicles'
});

module.exports = Vehicle;