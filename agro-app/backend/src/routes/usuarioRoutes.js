
const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const { usuarioSchema } = require('../validations/usuarioValidation');
const {usuarioIdParamSchema} = require('../validations/paramSchemas');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/', usuarioController.listarUsuarios);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rolid:
 *                 type: integer
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               telefono:
 *                 type: string
 *                 example: "3512345678"
 *               dni:
 *                 type: string
 *                 example: "12345678"
 *               direccion:
 *                 type: string
 *                 example: "Calle Falsa 123"
 *               passwordhash:
 *                 type: string
 *                 example: "hashed-password"
 *             required:
 *               - rolid
 *               - nombre
 *               - email
 *               - passwordhash
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post(
  '/',
  validate({ body: usuarioSchema }),
  usuarioController.registrarUsuario
);


/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 */

console.log('SCHEMA:', usuarioIdParamSchema);
console.log('CONTROLLER:', usuarioController.obtenerUsuario);

router.get(
  '/:id',
  validate({ params: usuarioIdParamSchema }),
  usuarioController.obtenerUsuarioPorId
);




module.exports = router;