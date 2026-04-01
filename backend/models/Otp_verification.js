const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OtpVerification = sequelize.define('OtpVerification', {
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
    },
    onDelete: 'CASCADE'
  },
  phone_or_email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: { notEmpty: true }
  },
  otp_code: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  channel: {
    type: DataTypes.ENUM('sms', 'email'),
    allowNull: false
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  verified_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  status: {
    type: DataTypes.ENUM('pending', 'verified', 'expired', 'failed'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'otp_verifications',
  // Critical for security/speed: search by contact + code
  indexes: [
    { fields: ['phone_or_email', 'otp_code'] },
    { fields: ['status'] }
  ]
});

module.exports = OtpVerification;