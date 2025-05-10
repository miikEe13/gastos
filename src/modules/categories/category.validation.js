const Joi = require('joi');

// Esquema de validación para una categoría
const categorySchema = Joi.object({
    name: Joi.string().required().min(2).max(50)
        .messages({
            'string.empty': 'El nombre es obligatorio',
            'string.min': 'El nombre debe tener al menos 2 caracteres',
            'string.max': 'El nombre no puede exceder los 50 caracteres',
            'any.required': 'El nombre es obligatorio'
        }),
    
    description: Joi.string().allow('', null).max(255)
        .messages({
            'string.max': 'La descripción no puede exceder los 255 caracteres'
        })
});

// Middleware de validación para la creación de una categoría
exports.validateCategory = (req, res, next) => {
    const { error } = categorySchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    
    next();
};

// Middleware de validación para parámetros ID
exports.validateId = (req, res, next) => {
    const idSchema = Joi.object({
        id: Joi.number().integer().positive().required()
            .messages({
                'number.base': 'El ID debe ser un número',
                'number.integer': 'El ID debe ser un número entero',
                'number.positive': 'El ID debe ser un valor positivo',
                'any.required': 'El ID es obligatorio'
            })
    });

    const { error } = idSchema.validate({ id: parseInt(req.params.id) }, { abortEarly: false });
    
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    
    next();
}; 