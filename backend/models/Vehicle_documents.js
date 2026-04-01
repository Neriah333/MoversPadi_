const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const VehicleDocuments = sequelize.define('VehicleDocuments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // Enforces One-to-One
    references: {
      model: 'vehicles',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  registration_document: {
    type: DataTypes.STRING(500), // Longer for Cloud URLs
    allowNull: true,
    defaultValue: null
  },
  road_worthiness_certificate: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: null
  },
  insurance_document: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: null
  },
  inspection_certificate: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: null
  },
  proof_of_ownership: {
    type: DataTypes.STRING(500),
    allowNull: true,
    defaultValue: null
  },
  uploaded_at: {
    type: DataTypes.DATE,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'vehicle_documents'
});

module.exports = VehicleDocuments;