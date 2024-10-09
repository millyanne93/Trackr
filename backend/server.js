require('dotenv').config(); // Load environment variables

const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use your frontend URL from .env
  credentials: true, // Allow cookies and authentication headers
};
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define API routes
app.use('/api', apiRoutes);

// Define the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export the app for Vercel
module.exports = app;
