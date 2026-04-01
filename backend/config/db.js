const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, // Make sure this matches your .env key (DB_PASS vs DB_PASSWORD)
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // CRITICAL: Aiven uses port 27167
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // This allows connection without a local CA cert file
      },
      connectTimeout: 60000 
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(' MySQL Connected successfully to Aiven.');

    // 1. Disable Foreign Key Checks temporarily
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // 2. Sync all tables
    // Use { alter: true } to update columns if they already exist
    await sequelize.sync({ alter: true });

    // 3. Re-enable Foreign Key Checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log(' All models synced successfully.');
  } catch (error) {
    console.error(' MySQL connection/sync error:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };