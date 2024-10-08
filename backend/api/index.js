const express = require('express');
const connectDB = require('../config/database'); // Adjusted path since it's now in api/
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('../routes/api'); // Adjusted path
const adminRoutes = require('../routes/adminRoutes'); // Adjusted path

const app = express();

// Connect to the database
connectDB();

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use env for frontend URL
  credentials: true, // Allow cookies and authentication headers
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// Export the app (Vercel will handle starting the server)
module.exports = app;
