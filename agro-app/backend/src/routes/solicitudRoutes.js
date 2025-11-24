const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');
const validate = require('../middlewares/validate');
const {
  usuarioIdParamSchema,
  solicitudIdParamSchema,
  idParamSchema,
  estadoIdParamSchema
} = require('../validations/paramSchemas');
const { cambiarEstadoSchema } = require('../validations/solicitudValidation');

/**
 * @swagger
 * /solicitudes:
 *   get:
 *     summary: Listar todas las solicitudes
 *     tags: [Solicitudes]
 *     responses:
 *       200:
 *         description: Lista completa de solicitudes
 */
router.get('/', solicitudController.listarSolicitudes);

/**
 * @swagger
 * /solicitudes/detalles:
 *   get:
 *     summary: Listar todas las solicitudes con sus detalles
 *     tags: [Solicitudes]
 *     responses:
 *       200:
 *         description: Lista de solicitudes con detalles
 */
router.get('/detalles', solicitudController.listarSolicitudesConDetalles);

/**
 * @swagger
 * /solicitudes/estado/{estadoId}:
 *   get:
 *     summary: Listar solicitudes por estado
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: estadoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado
 *     responses:
 *       200:
 *         description: Lista de solicitudes filtradas por estado
 */
router.get(
  '/estado/:estadoId',
  validate({ params: estadoIdParamSchema }),
  solicitudController.listarSolicitudesPorEstado
);

/**
 * @swagger
 * /solicitudes/{id}:
 *   post:
 *     summary: Crear una nueva solicitud para un usuario
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario que realiza la solicitud
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 */
router.post('/', solicitudController.crearSolicitud);



/**
 * @swagger
 * /solicitudes/usuario/{usuarioId}:
 *   get:
 *     summary: Listar todas las solicitudes de un usuario
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de solicitudes del usuario
 */
router.get('/usuario/:id', validate({ params: usuarioIdParamSchema }), solicitudController.listarSolicitudesPorUsuario);


/**
 * @swagger
 * /solicitudes/{solicitudId}:
 *   get:
 *     summary: Obtener una solicitud por ID
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: solicitudId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Solicitud encontrada
 *       404:
 *         description: Solicitud no encontrada
 */
router.get('/:id', validate({ params: idParamSchema }), solicitudController.obtenerSolicitudPorId);

/**
 * @swagger
 * /solicitudes/{id}/cancelar:
 *   put:
 *     summary: Cancelar una solicitud
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud a cancelar
 *     responses:
 *       200:
 *         description: Solicitud cancelada exitosamente
 */
router.put('/:id/cancelar', validate({ params: idParamSchema }), solicitudController.cancelarSolicitud);


/**
 * @swagger
 * /solicitudes/{id}/estado:
 *   put:
 *     summary: Cambiar el estado de una solicitud
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CambioEstado'
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 */
router.put('/:id/estado', validate({ params: idParamSchema, body: cambiarEstadoSchema }), solicitudController.cambiarEstadoSolicitud);

module.exports = router;