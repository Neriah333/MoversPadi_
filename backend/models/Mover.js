const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Mover = sequelize.define('Mover', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // One mover profile per user
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  // Document Paths (URLs to S3/Cloudinary)
  id_document: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  vehicle_registration_doc: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  road_worthiness_certificate: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  insurance_policy: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  passport_photo: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  // Bank Details
  bank_account_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  bank_account_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  bank_name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  verification_status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'movers'
});

module.exports = Mover;