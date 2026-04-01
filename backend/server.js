// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db'); // Import the wrapper

const app = express();
app.use(cors());
app.use(express.json());

// Start the sequence
const startServer = async () => {
  try {
    // This function now handles the auth, FK disable, and sync
    await connectDB(); 
    
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(` Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();