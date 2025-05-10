// src/config/constants.js

// Códigos de respuesta HTTP
exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

// Mensajes comunes
exports.MESSAGES = {
    // Mensajes de éxito
    EXPENSE_CREATED: 'Gasto creado exitosamente',
    EXPENSE_UPDATED: 'Gasto actualizado exitosamente',
    EXPENSE_DELETED: 'Gasto eliminado exitosamente',
    EXPENSES_CREATED: 'Gastos creados exitosamente',
    
    // Mensajes de autenticación
    USER_REGISTERED: 'Usuario registrado exitosamente',
    LOGIN_SUCCESS: 'Login exitoso',
    PASSWORD_CHANGED: 'Contraseña actualizada exitosamente',
    PROFILE_IMAGE_UPDATED: 'Imagen de perfil actualizada exitosamente',
    
    // Mensajes de error
    EXPENSE_NOT_FOUND: 'Gasto no encontrado',
    INVALID_DATA: 'Datos inválidos',
    DATABASE_ERROR: 'Error en la base de datos',
    SERVER_ERROR: 'Error interno del servidor',
    UNAUTHORIZED: 'Acceso no autorizado',
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    USER_NOT_FOUND: 'Usuario no encontrado',
    USERNAME_EXISTS: 'El nombre de usuario ya existe',
    EMAIL_EXISTS: 'El email ya existe',
    INVALID_TOKEN: 'Token inválido o expirado',
    IMAGE_REQUIRED: 'Se requiere una imagen'
};

// Configuración de la aplicación
exports.APP_CONFIG = {
    API_PREFIX: '/api',
    SWAGGER_PATH: '/api-docs',
    UPLOADS_DIR: '/uploads/profiles',
    JWT_EXPIRES_IN: '24h'
};

// Endpoints
exports.ENDPOINTS = {
    // Endpoints de gastos
    EXPENSES: '/expenses',
    EXPENSE: '/expense/:id',
    EXPENSES_BY_MONTH: '/expenses/:month/:year',
    EXPENSES_SUMMARY: '/expenses/summary/:month/:year',
    
    // Endpoints de autenticación
    AUTH_REGISTER: '/auth/register',
    AUTH_LOGIN: '/auth/login',
    AUTH_PROFILE: '/auth/profile',
    AUTH_CHANGE_PASSWORD: '/auth/change-password',
    AUTH_PROFILE_IMAGE: '/auth/profile/image'
}; 