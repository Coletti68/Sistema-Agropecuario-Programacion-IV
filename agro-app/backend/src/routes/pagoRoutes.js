const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');
const validate = require('../middlewares/validate');
const { pagoSchema } = require('../validations/pagoValidation');


/**
 * @swagger
 * tags:
 *   name: Pagos
 *   description: Gestión de pagos asociados a solicitudes
 */

/**
 * @swagger
 * /api/pagos:
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
router.post('/', validate(pagoSchema), pagoController.registrarPago);

/**
 * @swagger
 * /api/pagos/solicitud/{solicitudId}:
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
 *         description: Lista de pagos de la solicitud
 *       404:
 *         description: No se encontraron pagos para la solicitud indicada
 */
router.post('/', validate(pagoSchema), pagoController.registrarPago);
router.get('/', pagoController.listarPagos);
router.get('/usuario/:usuarioId', pagoController.listarPagosPorUsuario);
router.get('/solicitud/:solicitudId', pagoController.obtenerPagosPorSolicitud);
router.put('/:pagoId/estado', validate(pagoSchema.updateEstado), pagoController.actualizarEstadoPago);

module.exports = router;
