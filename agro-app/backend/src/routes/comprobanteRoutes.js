const express = require('express');
const router = express.Router();
const comprobanteController = require('../controllers/comprobanteController');
const validate = require('../middlewares/validate');
const { comprobanteSchema } = require('../validations/comprobanteEntregaValidation');

/**
 * @swagger
 * tags:
 *   name: Comprobantes
 *   description: Gestión de comprobantes de entrega
 */

/**
 * @swagger
 * /comprobantes:
 *   post:
 *     summary: Registrar un comprobante de entrega
 *     tags: [Comprobantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comprobante'
 *     responses:
 *       201:
 *         description: Comprobante registrado exitosamente
 */
router.post('/', validate(comprobanteSchema), comprobanteController.registrarComprobante);

/**
 * @swagger
 * /comprobantes/solicitud/{solicitudId}:
 *   get:
 *     summary: Obtener comprobantes por solicitud
 *     tags: [Comprobantes]
 *     parameters:
 *       - in: path
 *         name: solicitudId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de comprobantes
 */
router.get('/solicitud/:solicitudId', comprobanteController.obtenerComprobantesPorSolicitud);

module.exports = router;
