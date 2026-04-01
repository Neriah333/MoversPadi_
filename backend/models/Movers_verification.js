const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MoverVerification = sequelize.define('MoverVerification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // Enforces one verification record per user
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  driver_license_number: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  nin_number: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  passport_number: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  house_picture: {
    type: DataTypes.STRING(500), // URL to S3/Cloudinary
    allowNull: true,
    defaultValue: null
  },
  years_of_experience: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  bank_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
    type: DataTypes.TEXT, // Better for long feedback
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'mover_verifications'
});

module.exports = MoverVerification;