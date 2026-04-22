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
    const roles = [
      { name: 'admin', description: 'System Administrator' },
      { name: 'mover', description: 'Service Provider' },
      { name: 'customer', description: 'Standard User' },
      { name: 'company', description: 'Service Company' }
    ];

    for (const role of roles) {
      await Role.findOrCreate({
        where: { name: role.name },
        defaults: role
      });
    }

    console.log(' Roles seeded/checked successfully!');
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