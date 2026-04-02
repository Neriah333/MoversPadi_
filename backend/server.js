require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, sequelize } = require('./config/db'); // 1. Import sequelize here
const Role = require('./models/Role');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Health Check
app.get('/', (req, res) => {
  res.send('MoversPadi API is running...');
});

// 2. Seeding Logic
const seedRoles = async () => {
  try {
    const count = await Role.count();
    if (count === 0) {
      await Role.bulkCreate([
        { id: 1, name: 'admin', description: 'System Administrator' },
        { id: 2, name: 'mover', description: 'Service Provider' },
        { id: 3, name: 'customer', description: 'Standard User' }
      ]);
      console.log(' Default roles seeded successfully!');
    }
  } catch (error) {
    console.error(" Error seeding roles:", error);
  }
};

// 3. Start the sequence
const startServer = async () => {
  try {
    // This handles the MySQL connection and syncing
    await connectDB(); 
    
    // 4. Seed roles AFTER the DB is connected and synced
    await seedRoles();

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(` Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
    process.exit(1); 
  }
};

startServer();