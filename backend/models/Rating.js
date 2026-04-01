const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  service_request_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'service_requests',
      key: 'id'
    }
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  // The Mover (User) being rated
  rated_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  // The Company being rated
  rated_company_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.TINYINT, // Efficient for 1-5 scale
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  review: {
    type: DataTypes.TEXT, // Better for variable length comments
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'ratings'
});

module.exports = Rating;