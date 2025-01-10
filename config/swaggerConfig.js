const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Expense Management API',
    version: '1.0.0',
    description: 'API for managing expenses, including CRUD operations and monthly summaries',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development Server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
