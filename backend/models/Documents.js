const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Relationships
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'users', key: 'id' }
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'companies', key: 'id' }
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'vehicles', key: 'id' }
  },
  // Document Metadata
  document_type: {
    type: DataTypes.ENUM(
      'drivers_license', 'nin', 'passport', 'profile_photo',
      'house_picture', 'vehicle_registration', 'road_worthiness',
      'insurance', 'proof_of_ownership', 'cac_certificate',
      'company_picture', 'company_signature', 'guarantor_id', 'other'
    ),
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING(500), // Longer length for S3/Cloudinary URLs
    allowNull: false
  },
  original_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  mime_type: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  file_size: {
    type: DataTypes.BIGINT, // Good practice for file sizes in bytes
    allowNull: true
  },
  // Verification logic
  file_status: {
    type: DataTypes.ENUM('pending', 'verified', 'rejected'),
    defaultValue: 'pending'
  },
  verified_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  reviewed_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'users', key: 'id' }
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'documents'
});

module.exports = Document;