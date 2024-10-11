require('dotenv').config(); // Load environment variables

const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const morgan = require('morgan');
const bodyParser = require('body-parser'); // Import body-parser

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// Configure CORS dynamically based on the environment
const allowedOrigins = process.env.NODE_ENV === 'production' ? 
    ['https://trackr-kd45.vercel.app'] : 
    ['http://localhost:3000'];

const corsOptions = {
    origin: allowedOrigins, // Allow specific origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow required methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Include Authorization header
    credentials: true, // Allow credentials if needed (e.g., for cookies)
    optionsSuccessStatus: 200, // Some browsers (legacy) choke on 204 responses
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Middleware to log incoming requests (using morgan)
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev')); // Use 'dev' format for logging
}

// Middleware to handle preflight (OPTIONS) requests
app.options('*', cors(corsOptions)); // Preflight request handling for all routes

// Middleware to parse JSON requests using body-parser
app.use(bodyParser.json());

// Define API routes
app.use('/api', (req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
}, apiRoutes);

// Simple route for testing
app.get("/", (req, res) => {
    res.json({ message: "Hello World." });
});

// Error-handling middleware (for uncaught errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!" });
});

// Define the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Export the app for Vercel
module.exports = app;
