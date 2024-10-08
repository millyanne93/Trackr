require('dotenv').config();
const app = require('./api/index'); // Import the app from index.js
const connectDB = require('./config/database');

// Connect to the database
connectDB();

// Export the app for Vercel to handle starting the server
module.exports = app;
