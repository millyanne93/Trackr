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
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware to log incoming requests (using morgan)
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev')); // Use 'dev' format for logging
}

// Middleware to handle preflight (OPTIONS) requests
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.status(200).json({ body: 'OK' });
    }
    next();
});

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
