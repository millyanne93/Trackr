require('dotenv').config(); 

const express = require('express');
const helmet = require('helmet');
const connectDB = require('./config/database');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

connectDB();

app.use(helmet());

const allowedOrigins = process.env.NODE_ENV === 'production' ? 
    ['https://trackr-kd45.vercel.app'] : 
    ['http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api', (req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
}, apiRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hello World." });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!" });
});

app.use((req, res) => {
        res.status(404).json({
                    success: false,
                    message: 'Route not found'
                });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
