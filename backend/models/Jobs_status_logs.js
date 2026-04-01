const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const JobStatusLog = sequelize.define('JobStatusLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  service_request_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'service_requests', // Matches your ServiceRequest table name
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  changed_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  note: {
    type: DataTypes.TEXT, // Using TEXT in case logs get descriptive
    allowNull: true,
    defaultValue: null
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  // Disabling automatic timestamps because we only need created_at
  timestamps: false,
  tableName: 'job_status_logs',
  // Indexing status and IDs for faster reporting/filtering
  indexes: [
    { fields: ['service_request_id'] },
    { fields: ['status'] }
  ]
});

module.exports = JobStatusLog;