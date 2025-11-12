const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumoController');
const validate = require('../middlewares/validate'); 
const { insumoSchema } = require('../validations/insumoValidation');

/**
 * @swagger
 * tags:
 *   name: Insumos
 *   description: Endpoints para la gestión de insumos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Insumo:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           example: Fertilizante Orgánico
 *         descripcion:
 *           type: string
 *           example: Producto natural para el crecimiento vegetal
 *         precio_unitario:
 *           type: number
 *           example: 25.5
 *         stock_actual:
 *           type: integer
 *           example: 120
 *         proveedorid:
 *           type: integer
 *           example: 3
 *       required:
 *         - nombre
 *         - precio_unitario
 *         - stock_actual
 *         - proveedorid
 */

/**
 * @swagger
 * /api/insumos:
 *   get:
 *     summary: Obtener todos los insumos
 *     tags: [Insumos]
 *     responses:
 *       200:
 *         description: Lista de insumos obtenida exitosamente
 *       500:
 *         description: Error al obtener la lista
 */
router.get('/', insumoController.listarInsumos);

/**
 * @swagger
 * /api/insumos:
 *   post:
 *     summary: Crear un nuevo insumo
 *     tags: [Insumos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insumo'
 *     responses:
 *       201:
 *         description: Insumo creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', validate(insumoSchema), insumoController.crearInsumo);

/**
 * @swagger
 * /api/insumos/{insumoId}:
 *   put:
 *     summary: Actualizar un insumo existente
 *     tags: [Insumos]
 *     parameters:
 *       - in: path
 *         name: insumoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del insumo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Insumo'
 *     responses:
 *       200:
 *         description: Insumo actualizado exitosamente
 *       404:
 *         description: Insumo no encontrado
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.put('/:insumoId', validate(insumoSchema), insumoController.actualizarInsumo);

module.exports = router;