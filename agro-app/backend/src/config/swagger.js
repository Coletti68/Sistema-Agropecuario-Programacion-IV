const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Gestión de Solicitudes',
    version: '1.0.0',
    description: 'Documentación de la API para el sistema de gestión de solicitudes, cultivos e insumos'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ],
  components: {
    schemas: {
      Detalle: {
        type: 'object',
        properties: {
          insumoid: { type: 'integer' },
          cantidad: { type: 'number' },
          preciounitario: { type: 'number' }
        },
        required: ['insumoid', 'cantidad', 'preciounitario']
      },
      CambioEstado: {
        type: 'object',
        properties: {
          estadoid: { type: 'integer' },
          usuarioid: { type: 'integer' }
        },
        required: ['estadoid', 'usuarioid']
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;