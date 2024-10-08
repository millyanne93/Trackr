require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Connect to the database
connectDB();

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the URL of your frontend app
  credentials: true // Allow cookies and authentication headers
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
