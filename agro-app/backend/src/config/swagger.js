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
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {}, //sirve para escribir aca una unica vez un mismo schema y despues llamarlo en cada endpoint, en vez de definirlos uno x uno.
    },
  },
  apis: ['./src/routes/**/*.js'], // Le dice a swagger donde buscar los comentarios para generar la documentacion. Busca todos los arc '.js' dentro d src/routes.
};

//genera el objeto swagger y lo importa
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;