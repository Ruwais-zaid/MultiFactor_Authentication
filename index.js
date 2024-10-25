import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import dbConnect from './config/dbConnection.js';
import apiRoutes from './routes/api.js';
import './config/passportConfig.js'
const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
dbConnect();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

const corsOptions = {
    origin: ["https://localhost:3001"],
    credentials: true,
};
app.use(cors(corsOptions));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000 // 1 hour in milliseconds
    },
}));

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use('/api', apiRoutes);

// Root Route
app.get('/', (req, res) => {
    res.json({ msg: `Welcome to Port no ${PORT}` });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});

export default app;
