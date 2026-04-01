const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const NextOfKin = sequelize.define('NextOfKin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the Users table
      key: 'id'
    },
    onDelete: 'CASCADE' // Deletes the NextOfKin if the User is removed
  },
  full_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  relationship: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT, // Using TEXT for flexible address lengths
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'next_of_kins'
});

module.exports = NextOfKin;