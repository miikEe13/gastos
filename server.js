// server.js
const express = require('express');
const db = require('./config/db');
const cors = require('cors'); // Import CORS
require('dotenv').config();
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// CORS Middleware
app.use(cors({
    origin: '*', // Allow any origin (adjust in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

// Routes
app.use('/api', expenseRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('✅ Expense API is working correctly');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
