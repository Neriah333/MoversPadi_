const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Set to console.log to see the actual SQL if errors persist
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      },
      connectTimeout: 60000 
    },
    // Adding a pool prevents "Lost connection" errors on cloud databases like Aiven
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(' MySQL Connected successfully to Aiven.');

    /**
     * CRITICAL FIX: 
     * We removed { alter: true }. 
     * To fix your current error, you MUST manually drop the extra indexes 
     * in your DB console or run sync({ force: true }) once if you don't mind losing data.
     */
    await sequelize.sync(); 
    
    console.log(' All models synced successfully without schema corruption.');
  } catch (error) {
    console.error(' MySQL connection/sync error:', error);
    // Log more detail if it's a Sequelize error
    if (error.original) {
      console.error('Original Error Details:', error.original.sqlMessage);
    }
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };