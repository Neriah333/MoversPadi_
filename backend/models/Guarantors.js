const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Guarantor = sequelize.define('Guarantor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the target table
      key: 'id'
    },
    onDelete: 'CASCADE' // If a user is deleted, their guarantor record is removed
  },
  full_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { notEmpty: true }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT, // Use TEXT for flexible address lengths
    allowNull: false
  },
  occupation: {
    type: DataTypes.STRING(150),
    allowNull: true,
    defaultValue: null
  },
  means_of_identification: {
    type: DataTypes.STRING(150),
    allowNull: true,
    defaultValue: null
  },
  id_document_path: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'guarantors'
});

module.exports = Guarantor;