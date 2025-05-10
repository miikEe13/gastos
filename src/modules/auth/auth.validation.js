const Joi = require('joi');

// Esquema de validación para registro
const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'El nombre de usuario debe ser texto',
            'string.empty': 'El nombre de usuario no puede estar vacío',
            'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
            'string.max': 'El nombre de usuario no puede tener más de {#limit} caracteres',
            'string.alphanum': 'El nombre de usuario sólo puede contener letras y números',
            'any.required': 'El nombre de usuario es obligatorio'
        }),
    
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'El email debe ser texto',
            'string.empty': 'El email no puede estar vacío',
            'string.email': 'El email debe tener un formato válido',
            'any.required': 'El email es obligatorio'
        }),
        
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.base': 'La contraseña debe ser texto',
            'string.empty': 'La contraseña no puede estar vacía',
            'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
            'any.required': 'La contraseña es obligatoria'
        }),
        
    role: Joi.string()
        .valid('admin', 'user')
        .default('user')
        .messages({
            'string.base': 'El rol debe ser texto',
            'any.only': 'El rol debe ser admin o user'
        })
});

// Esquema de validación para login
const loginSchema = Joi.object({
    username: Joi.string()
        .required()
        .messages({
            'string.base': 'El nombre de usuario/email debe ser texto',
            'string.empty': 'El nombre de usuario/email no puede estar vacío',
            'any.required': 'El nombre de usuario/email es obligatorio'
        }),
        
    password: Joi.string()
        .required()
        .messages({
            'string.base': 'La contraseña debe ser texto',
            'string.empty': 'La contraseña no puede estar vacía',
            'any.required': 'La contraseña es obligatoria'
        })
});

// Esquema de validación para cambio de contraseña
const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .required()
        .messages({
            'string.base': 'La contraseña actual debe ser texto',
            'string.empty': 'La contraseña actual no puede estar vacía',
            'any.required': 'La contraseña actual es obligatoria'
        }),
        
    newPassword: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.base': 'La nueva contraseña debe ser texto',
            'string.empty': 'La nueva contraseña no puede estar vacía',
            'string.min': 'La nueva contraseña debe tener al menos {#limit} caracteres',
            'any.required': 'La nueva contraseña es obligatoria'
        })
});

// Middleware de validación para registro
const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Middleware de validación para login
const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Middleware de validación para cambio de contraseña
const validateChangePassword = (req, res, next) => {
    const { error } = changePasswordSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
    validateChangePassword
}; 