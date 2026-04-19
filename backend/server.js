require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db'); 
const Role = require('./models/Role');

require("./cronJobs");

const app = express();

app.use(cors({
  origin: ['https://moverspadi.vercel.app', 'http://localhost:8080'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
  res.send('MoversPadi API is running...');
});

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

async function startServer() {
  try {
    await connectDB(); 
    await seedRoles();

    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error(" Fatal Error during startup:", error);
    process.exit(1);
  }
}

startServer();