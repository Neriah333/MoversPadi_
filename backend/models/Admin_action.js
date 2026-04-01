const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Path to your sequelize instance

const AdminAction = sequelize.define('AdminAction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Foreign Key to the Users table
  admin_user_id: {
    type: DataTypes.INTEGER, // Match the type of your User ID
    allowNull: false,
    references: {
      model: 'Users', // Name of the target table
      key: 'id'
    }
  },
  action_type: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  target_type: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // In SQL, target_id usually points to various tables. 
  // If this is polymorphic, we keep it as a simple ID column.
  target_id: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT, // Better for variable length notes
    allowNull: true,
    defaultValue: null
  }
}, {
  // Mapping your Mongoose timestamp settings
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  tableName: 'admin_actions' // Explicit table name
});

module.exports = AdminAction;