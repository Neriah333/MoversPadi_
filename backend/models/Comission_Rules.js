const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CommissionRule = sequelize.define('CommissionRule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  service_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ServiceTypes', // Name of the target table
      key: 'id'
    }
  },
  commission_type: {
    // ENUMs are great for performance and data integrity in MySQL
    type: DataTypes.ENUM('percentage', 'flat_fee'),
    allowNull: false
  },
  commission_value: {
    // Using DECIMAL ensures we don't have rounding issues with money/percentages
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
    validate: {
      min: 0
    }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'commission_rules'
});

module.exports = CommissionRule;