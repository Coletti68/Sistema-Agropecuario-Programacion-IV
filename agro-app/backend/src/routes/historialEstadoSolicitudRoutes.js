const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialEstadoSolicitudController.js');
const validate = require('../middlewares/validate');
const { cambioEstadoSchema } = require('../validations/historialEstadoSolicitudValidation');
const { historialIdParamSchema, solicitudIdParamSchema, usuarioIdParamSchema } = require('../validations/paramSchemas');

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
 *             type: object
 *             properties:
 *               solicitudid:
 *                 type: integer
 *                 description: ID de la solicitud
 *                 example: 1
 *               estadosolicitudid:
 *                 type: integer
 *                 description: ID del estado al que se desea cambiar
 *                 example: 2
 *               usuarioid:
 *                 type: integer
 *                 description: ID del usuario que realiza el cambio
 *                 example: 1
 *             required:
 *               - solicitudid
 *               - estadosolicitudid
 *               - usuarioid
 *     responses:
 *       201:
 *         description: Cambio de estado registrado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validate({ body: cambioEstadoSchema }), historialController.registrarCambioEstado);

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
router.get('/:id', validate({ params: historialIdParamSchema }), historialController.obtenerPorId);

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
router.get('/solicitud/:solicitudId', validate({ params: solicitudIdParamSchema }), historialController.listarPorSolicitud);

/**
 * @swagger
 * /historial-estado/usuario/{id}:
 *   get:
 *     summary: Lista el historial de cambios realizados por un usuario específico
 *     tags: [HistorialEstadoSolicitud]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial obtenido exitosamente
 */
router.get('/usuario/:id', validate({ params: usuarioIdParamSchema }), historialController.listarPorUsuario);

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
router.get('/detalles/:solicitudId', validate({ params: solicitudIdParamSchema }), historialController.listarConDetalles);

module.exports = router;
