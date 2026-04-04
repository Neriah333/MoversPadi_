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
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      },
      connectTimeout: 60000 
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(' MySQL Connected successfully to Aiven.');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ alter: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log(' All models synced successfully.');
  } catch (error) {
    console.error(' MySQL connection/sync error:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };