const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('/config/swagger.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use(require('./routes/usuarioRoutes'));
app.use(require('./routes/cultivoRoutes'));
app.use(require('./routes/usuarioCultivoRoutes'));
app.use(require('./routes/solicitudRoutes'));
app.use(require('./routes/solicitudDetalleRoutes'));
app.use(require('./routes/proveedorRoutes'));
app.use(require('./routes/pagoRoutes'));
app.use(require('./routes/insumoRoutes'));
app.use(require('./routes/historialEstadoSolicitudRoutes'));
app.use(require('./routes/historialCultivoRoutes'));
app.use(require('./routes/comprobanteRoutes'));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;