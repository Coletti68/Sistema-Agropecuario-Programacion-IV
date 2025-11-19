const express = require('express');
const router = express.Router();

const proveedorController = require('../controllers/proveedorController');
const { proveedorSchema } = require('../validations/proveedorValidation');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * tags:
 *   name: Proveedores
 *   description: Endpoints para la gestión de proveedores
 */

/**
 * @swagger
 * /proveedores:
 *   get:
 *     summary: Listar todos los proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Proveedor'
 */
router.get('/', proveedorController.listarProveedores);

/**
 * @swagger
 * /proveedores:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proveedor'
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', validate(proveedorSchema), proveedorController.crearProveedor);

module.exports = router;
