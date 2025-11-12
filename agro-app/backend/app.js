const express = require('express'); //framework para levantar el sv
const cors = require('cors'); //middleware para permitir peticiones desde otros origenes (frontend)
require('dotenv').config();   //carga las variables desde el .env

const db = require('./src/config/db');     // conexión Sequelize
//require('./src/models');                   // ejecuta cada model con sus relaciones tmb

//temporales para testear usuario nomas
require('./src/models/usuarioModel');
const authRoutes = require('./src/routes/authRoutes'); // Rutas de login y registro


const swaggerJsdoc = require('swagger-jsdoc'); //generador d documentacion swagger desde las anotaciones d las rutas
const swaggerUi = require('swagger-ui-express'); //interfaz visual para mostrar la documentacion
const swaggerSpec = require('./src/config/swagger'); //confi swagger q difinimos en esa ubi

//const routes = require('./src/routes');    // index que agrupa todas las rutas

const app = express();  //crea la instancia del sv express
const PORT = process.env.PORT || 3000; //aclara el puerto en una var

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //monta swagger en /api-docs

//temporales para testear usuario nomas
app.use('/auth', authRoutes); 

//app.use('/api', routes); // todas las rutas quedan bajo /api/... (ej: /api/usuarios, /api/login)

/*
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});
*/

// 🔹 Arranque del servidor
app.listen(PORT, async () => {
  try {
    await db.authenticate();
    console.log('✅ Conexión a la base de datos establecida');
    console.log(`🚀 API corriendo en http://localhost:${PORT}/api-docs`);
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
});