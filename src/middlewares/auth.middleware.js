const jwt = require('jsonwebtoken');
const env = require('../config/env');

/**
 * Middleware para verificar si el usuario está autenticado
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const authMiddleware = (req, res, next) => {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado' });
    }
    
    // Obtener el token sin el prefijo 'Bearer '
    const token = authHeader.split(' ')[1];
    
    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, env.JWT_SECRET || 'your-super-secret-key');
        
        // Adjuntar la información del usuario al objeto request para uso posterior
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

/**
 * Middleware para verificar si el usuario tiene rol de administrador
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const adminMiddleware = (req, res, next) => {
    // Primero verificar si está autenticado
    authMiddleware(req, res, () => {
        // Verificar si el usuario tiene rol de administrador
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador' });
        }
    });
};

module.exports = {
    authMiddleware,
    adminMiddleware
}; 