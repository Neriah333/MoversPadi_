const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CompanyVerification = sequelize.define('CompanyVerification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // Enforces one verification record per company
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  cac_certificate_path: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  company_picture_path: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  signature_path: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  representative_name: {
    type: DataTypes.STRING(150),
    allowNull: true,
    defaultValue: null
  },
  representative_phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: null
  },
  representative_id_type: {
    type: DataTypes.ENUM('nin', 'passport', 'drivers_license', 'voters_card', 'other'),
    allowNull: true,
    defaultValue: null
  },
  representative_id_number: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  verification_status: {
    type: DataTypes.ENUM(
      'pending',
      'approved',
      'rejected',
      'resubmission_required',
      'suspended'
    ),
    defaultValue: 'pending'
  },
  submitted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  reviewed_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  reviewed_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'users', // Usually an Admin user
      key: 'id'
    }
  },
  rejection_reason: {
    type: DataTypes.TEXT, // Better for long explanations
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'company_verifications'
});

module.exports = CompanyVerification;