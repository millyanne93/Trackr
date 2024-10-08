const express = require('express');
const connectDB = require('../config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('../routes/api');
const adminRoutes = require('../routes/adminRoutes');

const app = express();

// Connect to the database
connectDB();

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true, // Allow cookies and authentication headers
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// Export the app for use in server.js
module.exports = app;
