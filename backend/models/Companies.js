const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // One company per user
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  company_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { notEmpty: true }
  },
  official_email: {
    type: DataTypes.STRING(255), // Standard length for emails
    unique: true, // In MySQL, multiple NULLs are allowed in unique columns
    allowNull: true,
    validate: { isEmail: true }
  },
  official_phone: {
    type: DataTypes.STRING(20), // Adjusted for typical phone lengths
    allowNull: false
  },
  cac_number: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: true
  },
  tin_number: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  address: {
    type: DataTypes.TEXT, // Using TEXT for potentially long addresses
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null
  },
  logo: {
    type: DataTypes.STRING(255), // Store the URL or path
    allowNull: true,
    defaultValue: null
  },
  company_picture: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  signature_path: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  },
  fleet_size: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: { min: 0 }
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'suspended'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'companies'
});

module.exports = Company;