const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');

// ← Este SÍ está en historialCultivoValidation
const { cambioCultivoSchema } = require('../validations/historialCultivoValidation');

// ← Estos SÍ están en paramSchemas
const {
  usuarioIdParamSchema,
  usuariocultivoIdParamSchema,
  idParamSchema
} = require('../validations/paramSchemas');

const historialCultivoController = require('../controllers/historialCultivoController');

/**
 * @swagger
 * tags:
 *   name: HistorialCultivo
 *   description: Gestión del historial de cambios de cultivos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     HistorialCultivoInput:
 *       type: object
 *       required:
 *         - usuariocultivoid
 *         - usuarioid
 *         - latitud
 *         - longitud
 *       properties:
 *         usuariocultivoid:
 *           type: integer
 *         usuarioid:
 *           type: integer
 *         latitud:
 *           type: number
 *         longitud:
 *           type: number
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
 *             $ref: '#/components/schemas/HistorialCultivoInput'
 *     responses:
 *       201:
 *         description: Cambio registrado exitosamente
 */
router.post(
  '/',
  validate({ body: cambioCultivoSchema }),
  historialCultivoController.registrarCambio
);

/**
 * @swagger
 * /historial:
 *   get:
 *     summary: Lista todos los registros del historial
 *     tags: [HistorialCultivo]
 *     responses:
 *       200:
 *         description: Lista obtenida exitosamente
 */
router.get('/', historialCultivoController.listarHistorial);

/**
 * @swagger
 * /historial/{id}:
 *   get:
 *     summary: Obtiene un registro del historial por ID
 *     tags: [HistorialCultivo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       404:
 *         description: Registro no encontrado
 */
router.get(
  '/:id',
  validate({ params: idParamSchema }),
  historialCultivoController.obtenerPorId
);

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
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro eliminado exitosamente
 */
router.delete(
  '/:id',
  validate({ params: idParamSchema }),
  historialCultivoController.eliminarRegistro
);

/**
 * @swagger
 * /historial/usuario/{usuarioId}:
 *   get:
 *     summary: Lista el historial perteneciente a un usuario
 *     tags: [HistorialCultivo]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial encontrado correctamente
 */
router.get(
  '/usuario/:usuarioId',
  validate({ params: usuarioIdParamSchema}),
  historialCultivoController.listarPorUsuario
);

/**
 * @swagger
 * /historial/asignacion/{usuariocultivoId}:
 *   get:
 *     summary: Lista el historial de una asignación usuario–cultivo
 *     tags: [HistorialCultivo]
 *     parameters:
 *       - in: path
 *         name: usuariocultivoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial encontrado correctamente
 */
router.get(
  '/asignacion/:usuariocultivoId',
  validate({ params: usuariocultivoIdParamSchema }),
  historialCultivoController.listarPorAsignacion
);

/**
 * @swagger
 * /historial/detalles/{usuariocultivoId}:
 *   get:
 *     summary: Lista historial con detalles completos (usuario + cultivo)
 *     tags: [HistorialCultivo]
 *     parameters:
 *       - in: path
 *         name: usuariocultivoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles completos del historial
 */
router.get(
  '/detalles/:usuariocultivoId',
  validate({ params: usuariocultivoIdParamSchema}),
  historialCultivoController.listarConDetalles
);

module.exports = router;