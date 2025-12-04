const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');
const validate = require('../middlewares/validate');
const { pagoSchema } = require('../validations/pagoValidation');
const {pagoParamsUsuario} = require('../validations/pagoValidation');
const {pagoParamsPagoId} = require('../validations/pagoValidation');
const {pagoParamsSolicitud} = require('../validations/pagoValidation');
const {pagoEstadoBody} = require('../validations/pagoValidation')


/**
 * @swagger
 * tags:
 *   name: Pagos
 *   description: Gestión de pagos asociados a solicitudes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pago:
 *       type: object
 *       required:
 *         - solicitudid
 *         - usuarioid
 *         - monto
 *         - metodo_pago
 *       properties:
 *         pagoid:
 *           type: integer
 *           description: ID del pago
 *         solicitudid:
 *           type: integer
 *           description: ID de la solicitud asociada
 *         usuarioid:
 *           type: integer
 *           description: ID del usuario que paga
 *         fecha_pago:
 *           type: string
 *           format: date-time
 *           description: Fecha del pago
 *         monto:
 *           type: number
 *           format: float
 *           description: Monto del pago
 *         metodo_pago:
 *           type: string
 *           enum: [efectivo, transferencia, tarjeta]
 *           description: Método de pago
 *         estado_pago:
 *           type: string
 *           enum: [pendiente, confirmado, rechazado]
 *         observaciones:
 *           type: string
 *           nullable: true
 */

/**
 * @swagger
 * /pagos:
 *   post:
 *     summary: Registrar un nuevo pago
 *     tags: [Pagos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pago'
 *     responses:
 *       201:
 *         description: Pago registrado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post(
  '/',
  validate({ body: pagoSchema }),
  pagoController.registrarPago
);

/**
 * @swagger
 * /pagos:
 *   get:
 *     summary: Listar todos los pagos (solo admin)
 *     tags: [Pagos]
 *     responses:
 *       200:
 *         description: Lista de todos los pagos
 */
router.get('/', pagoController.listarPagos);

/**
 * @swagger
 * /pagos/usuario/{usuarioId}:
 *   get:
 *     summary: Obtener pagos de un usuario
 *     tags: [Pagos]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de pagos del usuario
 *       404:
 *         description: No se encontraron pagos para este usuario
 */
router.get(
  '/usuario/:usuarioId',
  validate({ params: pagoParamsUsuario }),
  pagoController.listarPagosPorUsuario
);

/**
 * @swagger
 * /pagos/solicitud/{solicitudId}:
 *   get:
 *     summary: Obtener pagos por solicitud
 *     tags: [Pagos]
 *     parameters:
 *       - in: path
 *         name: solicitudId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Lista de pagos asociados a la solicitud
 *       404:
 *         description: No se encontraron pagos para esta solicitud
 */
router.get(
  '/solicitud/:solicitudId',
  validate({ params: pagoParamsSolicitud }),
  pagoController.obtenerPagosPorSolicitud
);

/**
 * @swagger
 * /pagos/{pagoId}/estado:
 *   put:
 *     summary: Actualizar estado de un pago (admin)
 *     tags: [Pagos]
 *     parameters:
 *       - in: path
 *         name: pagoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado_pago
 *             properties:
 *               estado_pago:
 *                 type: string
 *                 enum: [pendiente, confirmado, rechazado]
 *     responses:
 *       200:
 *         description: Estado del pago actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Pago no encontrado
 */
router.put(
  '/:pagoId/estado',
  validate({ params: pagoParamsPagoId, body: pagoEstadoBody }),
  pagoController.actualizarEstadoPago
);

module.exports = router;
