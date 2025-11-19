const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialEstadoSolicitudController');
const validate = require('../middlewares/validate');
const { cambioEstadoSchema } = require('../validations/historialEstadoSolicitudValidation');

/**
 * @swagger
 * tags:
 *   name: HistorialEstadoSolicitud
 *   description: Gestión del historial de cambios de estado de las solicitudes
 */

/**
 * @swagger
 * /historial-estado:
 *   post:
 *     summary: Registra un nuevo cambio de estado en una solicitud
 *     tags: [HistorialEstadoSolicitud]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistorialEstadoSolicitud'
 *     responses:
 *       201:
 *         description: Cambio de estado registrado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', validate(cambioEstadoSchema), historialController.registrarCambioEstado);

/**
 * @swagger
 * /historial-estado:
 *   get:
 *     summary: Lista todos los registros del historial de estados
 *     tags: [HistorialEstadoSolicitud]
 *     responses:
 *       200:
 *         description: Historial obtenido exitosamente
 */
router.get('/', historialController.listarHistorial);

/**
 * @swagger
 * /historial-estado/{id}:
 *   get:
 *     summary: Obtiene un registro de historial de estado por su ID
 *     tags: [HistorialEstadoSolicitud]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de historial
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       404:
 *         description: Registro no encontrado
 */
router.get('/:id', historialController.obtenerPorId);

/**
 * @swagger
 * /historial-estado/solicitud/{solicitudId}:
 *   get:
 *     summary: Lista el historial de estados de una solicitud específica
 *     tags: [HistorialEstadoSolicitud]
 *     parameters:
 *       - in: path
 *         name: solicitudId
 *         required: true
 *         description: ID de la solicitud
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial encontrado
 *       404:
 *         description: No se encontraron registros
 */
router.get('/solicitud/:solicitudId', historialController.listarPorSolicitud);

/**
 * @swagger
 * /historial-estado/usuario/{usuarioId}:
 *   get:
 *     summary: Lista el historial de cambios realizados por un usuario específico
 *     tags: [HistorialEstadoSolicitud]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial obtenido exitosamente
 */
router.get('/usuario/:usuarioId', historialController.listarPorUsuario);

/**
 * @swagger
 * /historial-estado/detalles/{solicitudId}:
 *   get:
 *     summary: Lista el historial con detalles de solicitud, usuario y estado
 *     tags: [HistorialEstadoSolicitud]
 *     parameters:
 *       - in: path
 *         name: solicitudId
 *         required: true
 *         description: ID de la solicitud
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial con detalles obtenido exitosamente
 */
router.get('/detalles/:solicitudId', historialController.listarConDetalles);

module.exports = router;
