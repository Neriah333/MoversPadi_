const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { notEmpty: true }
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id'
    }
  },
  email: {
    type: DataTypes.STRING(191), // 191 is the max for unique indexes in older MySQL UTF8MB4
    allowNull: true,
    unique: true,
    validate: { isEmail: true }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'active', 'suspended', 'rejected'),
    defaultValue: 'pending'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  last_login_at: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  remember_token: {
    type: DataTypes.STRING(255),
    defaultValue: null
  },
  // Soft Delete Field
  deleted_at: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  // 🔐 Verification & Reset
  verifyToken: {
    type: DataTypes.STRING(255),
    defaultValue: null
  },
  verifyTokenExpires: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  verifyCode: {
    type: DataTypes.STRING(10),
    defaultValue: null
  },
  verifyCodeExpires: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  resetPasswordToken: {
    type: DataTypes.STRING(255),
    defaultValue: null
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'users',
  // Sequelize has built-in support for soft deletes via 'paranoid'
  paranoid: true, 
  deletedAt: 'deleted_at'
});

module.exports = User;