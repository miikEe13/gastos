const Joi = require('joi');

// Esquema de validación para un gasto
const expenseSchema = Joi.object({
    description: Joi.string().required().min(3).max(255)
        .messages({
            'string.empty': 'La descripción es obligatoria',
            'string.min': 'La descripción debe tener al menos 3 caracteres',
            'string.max': 'La descripción no puede exceder los 255 caracteres',
            'any.required': 'La descripción es obligatoria'
        }),
    
    amount: Joi.number().required().positive()
        .messages({
            'number.base': 'El monto debe ser un número',
            'number.positive': 'El monto debe ser un valor positivo',
            'any.required': 'El monto es obligatorio'
        }),
    
    date: Joi.date().required().iso()
        .messages({
            'date.base': 'La fecha debe ser válida',
            'date.format': 'La fecha debe tener formato YYYY-MM-DD',
            'any.required': 'La fecha es obligatoria'
        }),
        
    category_id: Joi.number().integer().positive().allow(null)
        .messages({
            'number.base': 'El ID de categoría debe ser un número',
            'number.integer': 'El ID de categoría debe ser un número entero',
            'number.positive': 'El ID de categoría debe ser un valor positivo'
        }),
        
    is_fixed: Joi.boolean().default(false)
        .messages({
            'boolean.base': 'El valor debe ser verdadero o falso'
        }),
        
    is_installment: Joi.boolean().default(false)
        .messages({
            'boolean.base': 'El valor debe ser verdadero o falso'
        }),
        
    total_installments: Joi.number().integer().positive().allow(null)
        .when('is_installment', {
            is: true,
            then: Joi.required()
                .messages({
                    'any.required': 'El número total de plazos es obligatorio para gastos a plazos'
                })
        })
        .messages({
            'number.base': 'El número total de plazos debe ser un número',
            'number.integer': 'El número total de plazos debe ser un número entero',
            'number.positive': 'El número total de plazos debe ser un valor positivo'
        }),
        
    current_installment: Joi.number().integer().positive().allow(null)
        .when('is_installment', {
            is: true,
            then: Joi.required()
                .messages({
                    'any.required': 'El plazo actual es obligatorio para gastos a plazos'
                })
        })
        .messages({
            'number.base': 'El plazo actual debe ser un número',
            'number.integer': 'El plazo actual debe ser un número entero',
            'number.positive': 'El plazo actual debe ser un valor positivo'
        }),
        
    notes: Joi.string().allow('', null).max(500)
        .messages({
            'string.max': 'Las notas no pueden exceder los 500 caracteres'
        })
});

// Esquema de validación para múltiples gastos
const multipleExpensesSchema = Joi.array().items(expenseSchema).min(1)
    .messages({
        'array.min': 'Debe proporcionar al menos un gasto',
        'array.base': 'El formato debe ser un array de gastos'
    });

// Middleware de validación para la creación de un gasto
exports.validateExpense = (req, res, next) => {
    const { error } = expenseSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    
    next();
};

// Middleware de validación para la creación de múltiples gastos
exports.validateMultipleExpenses = (req, res, next) => {
    const { error } = multipleExpensesSchema.validate(req.body, { abortEarly: false });
    
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

// Middleware de validación para parámetros de mes y año
exports.validateMonthYear = (req, res, next) => {
    const monthYearSchema = Joi.object({
        month: Joi.number().integer().min(1).max(12).required()
            .messages({
                'number.base': 'El mes debe ser un número',
                'number.integer': 'El mes debe ser un número entero',
                'number.min': 'El mes debe estar entre 1 y 12',
                'number.max': 'El mes debe estar entre 1 y 12',
                'any.required': 'El mes es obligatorio'
            }),
        year: Joi.number().integer().min(2000).max(new Date().getFullYear() + 1).required()
            .messages({
                'number.base': 'El año debe ser un número',
                'number.integer': 'El año debe ser un número entero',
                'number.min': 'El año debe ser mayor a 2000',
                'number.max': 'El año no puede ser mayor al próximo año',
                'any.required': 'El año es obligatorio'
            })
    });

    const { error } = monthYearSchema.validate({
        month: parseInt(req.params.month),
        year: parseInt(req.params.year)
    }, { abortEarly: false });
    
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    
    next();
}; 