const express = require('express');
const router = express.Router();
const cultivoController = require('../controllers/cultivoController');
const validate = require('../middlewares/validate');
const { cultivoSchema } = require('../validations/cultivoValidation');

/**
 * @swagger
 * tags:
 *   name: Cultivos
 *   description: Gestión de cultivos
 */

/**
 * @swagger
 * /api/cultivos:
 *   get:
 *     summary: Listar todos los cultivos
 *     tags: [Cultivos]
 *     responses:
 *       200:
 *         description: Lista de cultivos obtenida exitosamente
 */
router.get('/', cultivoController.listarCultivos);

/**
 * @swagger
 * /api/cultivos:
 *   post:
 *     summary: Crear un nuevo cultivo
 *     tags: [Cultivos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cultivo'
 *     responses:
 *       201:
 *         description: Cultivo creado exitosamente
 */
router.post('/', validate(cultivoSchema, 'body'), cultivoController.crearCultivo);

/**
 * @swagger
 * /api/cultivos/{id}:
 *   put:
 *     summary: Actualizar un cultivo
 *     tags: [Cultivos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cultivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cultivo'
 *     responses:
 *       200:
 *         description: Cultivo actualizado exitosamente
 */
router.put('/:id', validate(cultivoSchema), cultivoController.actualizarCultivo);

/**
 * @swagger
 * /api/cultivos/{id}:
 *   delete:
 *     summary: Eliminar un cultivo
 *     tags: [Cultivos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cultivo eliminado exitosamente
 */
router.delete('/:id', cultivoController.eliminarCultivo);

module.exports = router;
