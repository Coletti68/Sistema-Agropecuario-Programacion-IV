const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para login y registro de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión con email y contraseña
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar nuevo usuario como productor
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               telefono:
 *                 type: string
 *               dni:
 *                 type: string
 *               direccion:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - nombre
 *               - email
 *               - password
 *           example:
 *             nombre: Juan Pérez
 *             email: juan@example.com
 *             telefono: "3794123456"
 *             dni: "30123456"
 *             direccion: "Ruta 12 km 3, Goya"
 *             password: "secreto123"
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       500:
 *         description: Error interno del servidor
 */
router.post('/register', authController.register);

module.exports = router;
