const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SavedLocation = sequelize.define('SavedLocation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  label: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: true }
  },
  address: {
    type: DataTypes.TEXT, // Using TEXT for potentially long addresses
    allowNull: false
  },
  lat: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    validate: { min: -90, max: 90 }
  },
  lng: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
    validate: { min: -180, max: 180 }
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'saved_locations',
  indexes: [
    { fields: ['user_id'] } // Speeds up loading a user's address book
  ]
});

module.exports = SavedLocation;