// src/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { swaggerUi, swaggerSpec } = require('./config/swaggerConfig');
const env = require('./config/env');
const { APP_CONFIG } = require('./config/constants');

// Rutas
const expenseRoutes = require('./modules/expenses/expense.routes');
const categoryRoutes = require('./modules/categories/category.routes');
const authRoutes = require('./modules/auth/auth.routes');

// Crear la aplicación Express
const app = express();

// Middleware para analizar JSON
app.use(express.json());

// Middleware CORS
app.use(cors({
    origin: env.CORS.ORIGIN,
    methods: env.CORS.METHODS.split(','),
    allowedHeaders: env.CORS.HEADERS.split(',')
}));

// Configurar carpeta de uploads como estática para servir archivos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Documentación Swagger
app.use(APP_CONFIG.SWAGGER_PATH, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use(APP_CONFIG.API_PREFIX, expenseRoutes);
app.use(APP_CONFIG.API_PREFIX, categoryRoutes);
app.use(APP_CONFIG.API_PREFIX, authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('✅ Expense API is working correctly');
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app; 