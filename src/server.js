// src/server.js
const app = require('./app');
const env = require('./config/env');
const db = require('./config/db');

// Puerto del servidor
const PORT = env.PORT;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
    console.log(`📚 Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
    console.log(`🌎 Entorno: ${env.NODE_ENV}`);
}); 