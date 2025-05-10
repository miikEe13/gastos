require('dotenv').config();

/**
 * Configuración de variables de entorno
 */
const env = {
    // Puerto del servidor
    PORT: process.env.PORT || 3000,
    
    // Configuración de la base de datos
    DB: {
        HOST: process.env.DB_HOST || 'localhost',
        USER: process.env.DB_USER || 'root',
        PASSWORD: process.env.DB_PASSWORD || '',
        NAME: process.env.DB_NAME || 'expenses_db',
        PORT: process.env.DB_PORT || 3306
    },
    
    // Entorno (development, production, test)
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // Configuración CORS
    CORS: {
        ORIGIN: process.env.CORS_ORIGIN || '*',
        METHODS: process.env.CORS_METHODS || 'GET,POST,PUT,DELETE',
        HEADERS: process.env.CORS_HEADERS || 'Content-Type,Authorization'
    },
    
    // Configuración JWT
    JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
    
    // Configuración de carga de archivos
    UPLOADS_DIR: process.env.UPLOADS_DIR || 'uploads/profiles',
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024 // 5MB
};

module.exports = env; 