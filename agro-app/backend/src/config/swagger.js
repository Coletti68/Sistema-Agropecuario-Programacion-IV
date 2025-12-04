const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Agropecuario',
      version: '1.0.0',
      description: 'Documentación de la API del sistema agropecuario',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // 👈 agrega /api si todas tus rutas usan ese prefijo
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        Cultivo: {
          type: 'object',
          required: ['nombre'],
          properties: {
            cultivoid: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'Trigo' },
            descripcion: { type: 'string', example: 'Cultivo de invierno usado para harina' },
            activo: { type: 'boolean', example: true },
          },
        },
        Proveedor: {
          type: 'object',
          required: ['nombre'],
          properties: {
            proveedorid: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'AgroAndes S.A.' },
            direccion: { type: 'string', example: 'Ruta 9 km 245' },
            telefono: { type: 'string', example: '3854765123' },
            email: { type: 'string', example: 'contacto@agroandes.com' },
          },
        },
        Usuario: {
          type: 'object',
          required: ['nombre', 'email'],
          properties: {
            usuarioid: { type: 'integer', example: 10 },
            nombre: { type: 'string', example: 'Juan Pérez' },
            email: { type: 'string', example: 'juan@example.com' },
            rol: { type: 'string', example: 'admin' },
          },
        },
        // Puedes agregar los demás: Solicitud, Pago, Insumo, etc.
      },
    },
  },
  apis: ['./src/routes/**/*.js'], // busca anotaciones en rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
