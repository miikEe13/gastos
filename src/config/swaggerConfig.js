// src/config/swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger Options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expense API',
            version: '1.0.0',
            description: 'RESTful API for personal expense management with categorization, fixed and installment expenses',
            contact: {
                name: 'Support',
                email: 'support@example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development Server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                Expense: {
                    type: 'object',
                    required: ['description', 'amount', 'date'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Unique expense ID'
                        },
                        description: {
                            type: 'string',
                            description: 'Expense description'
                        },
                        amount: {
                            type: 'number',
                            format: 'float',
                            description: 'Expense amount'
                        },
                        date: {
                            type: 'string',
                            format: 'date',
                            description: 'Expense date (YYYY-MM-DD)'
                        },
                        category_id: {
                            type: 'integer',
                            nullable: true,
                            description: 'Category ID'
                        },
                        is_fixed: {
                            type: 'boolean',
                            description: 'Indicates if it is a fixed expense'
                        },
                        is_installment: {
                            type: 'boolean',
                            description: 'Indicates if it is an installment expense'
                        },
                        total_installments: {
                            type: 'integer',
                            nullable: true,
                            description: 'Total number of installments'
                        },
                        current_installment: {
                            type: 'integer',
                            nullable: true,
                            description: 'Current installment number'
                        },
                        notes: {
                            type: 'string',
                            nullable: true,
                            description: 'Additional notes about the expense'
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Record creation date'
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update date'
                        }
                    }
                },
                Category: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Unique category ID'
                        },
                        name: {
                            type: 'string',
                            description: 'Category name'
                        },
                        description: {
                            type: 'string',
                            nullable: true,
                            description: 'Category description'
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Record creation date'
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update date'
                        }
                    }
                },
                User: {
                    type: 'object',
                    required: ['username', 'email', 'password'],
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Unique user ID'
                        },
                        username: {
                            type: 'string',
                            description: 'Username'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'User password (hashed, not returned in responses)'
                        },
                        profile_image: {
                            type: 'string',
                            nullable: true,
                            description: 'Path to profile image'
                        },
                        role: {
                            type: 'string',
                            enum: ['admin', 'user'],
                            description: 'User role'
                        },
                        created_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Record creation date'
                        },
                        updated_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Last update date'
                        }
                    }
                },
                AuthResponse: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string',
                            description: 'JWT token'
                        },
                        user: {
                            $ref: '#/components/schemas/User'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/modules/**/*.routes.js']
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec }; 