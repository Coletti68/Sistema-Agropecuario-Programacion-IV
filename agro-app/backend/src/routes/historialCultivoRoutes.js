const express = require('express');
const router = express.Router();
const historialCultivoController = require('../controllers/historialCultivoController');
const validate = require('../middlewares/validate');
const { cambioCultivoSchema } = require('../validations/historialCultivoValidation');
/**
 * @swagger
 * tags:
 *   name: HistorialCultivo
 *   description: Gestión del historial de cambios de cultivos
 */

/**
 * @swagger
 * /historial:
 *   post:
 *     summary: Registra un nuevo cambio en el historial
 *     tags: [HistorialCultivo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistorialCultivo'
 *     responses:
 *       201:
 *         description: Cambio registrado exitosamente
 */
router.post('/', validate(cambioCultivoSchema), historialCultivoController.registrarCambio);

/**
 * @swagger
 * /historial:
 *   get:
 *     summary: Lista todos los registros del historial
 *     tags: [HistorialCultivo]
 *     responses:
 *       200:
 *         description: Lista de historial obtenida exitosamente
 */
router.get('/', historialCultivoController.listarHistorial);

/**
 * @swagger
 * /historial/{id}:
 *   get:
 *     summary: Obtiene un registro de historial por ID
 *     tags: [HistorialCultivo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro del historial
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       404:
 *         description: Registro no encontrado
 */
router.get('/:id', historialCultivoController.obtenerPorId);

/**
 * @swagger
 * /historial/{id}:
 *   delete:
 *     summary: Elimina un registro del historial
 *     tags: [HistorialCultivo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro eliminado exitosamente
 */
router.delete('/:id', historialCultivoController.eliminarRegistro);

/**
 * @swagger
 * /historial/usuario/{usuarioId}:
 *   get:
 *     summary: Lista el historial de un usuario específico
 *     tags: [HistorialCultivo]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial encontrado
 */
router.get('/usuario/:usuarioId', historialCultivoController.listarPorUsuario);

/**
 * @swagger
 * /historial/asignacion/{usuariocultivoId}:
 *   get:
 *     summary: Lista historial por asignación de cultivo
 *     tags: [HistorialCultivo]
 *     parameters:
 *       - in: path
 *         name: usuariocultivoId
 *         required: true
 *         description: ID de la asignación usuario-cultivo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial obtenido correctamente
 */
router.get('/asignacion/:usuariocultivoId', historialCultivoController.listarPorAsignacion);

/**
 * @swagger
 * /historial/detalles/{usuariocultivoId}:
 *   get:
 *     summary: Lista historial con detalles completos de usuario y cultivo
 *     tags: [HistorialCultivo]
 *     parameters:
 *       - in: path
 *         name: usuariocultivoId
 *         required: true
 *         description: ID de la asignación usuario-cultivo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del historial obtenidos correctamente
 */
router.get('/detalles/:usuariocultivoId', historialCultivoController.listarConDetalles);

module.exports = router;
