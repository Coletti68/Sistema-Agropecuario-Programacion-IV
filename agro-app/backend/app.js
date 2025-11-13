const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./src/config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api', routes);

// Middleware global de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

// Arranque del servidor
app.listen(PORT, async () => {
  try {
    await db.authenticate();
    console.log('✅ Base de datos conectada correctamente');
    console.log(`🌱 Servidor escuchando en: http://localhost:${PORT}`);
    console.log(`📘 Swagger disponible en: http://localhost:${PORT}/api-docs`);
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:', error.message);
  }
});
