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
    origin: ['https://trackr-kd45.vercel.app', 'http://localhost:3000'], // Allow both local and production URLs
    credentials: true, // Allow cookies and authentication headers
    optionsSuccessStatus: 200, // For legacy browser support
};

// CORS Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins; adjust as necessary for security
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
    
    // Preflight request handling
    if (req.method === 'OPTIONS') {
        return res.status(200).json({ body: 'OK' });
    }
    next();
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define API routes
app.use('/api', (req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
}, apiRoutes);

// Define a simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello World." });
});

// Define the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Export the app for Vercel
module.exports = app;
