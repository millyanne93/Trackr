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

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
