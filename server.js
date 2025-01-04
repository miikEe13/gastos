// server.js
const express = require('express');
const db = require('./config/db');
require('dotenv').config();
const gastoRoutes = require('./routes/gastoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/gastos', gastoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('✅ API de gastos funcionando correctamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
