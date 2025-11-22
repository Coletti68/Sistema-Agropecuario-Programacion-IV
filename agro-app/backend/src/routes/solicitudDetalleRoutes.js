const express = require('express');
const router = express.Router();
const solicitudDetalleController = require('../controllers/solicitudDetalleController');
const validate = require('../middlewares/validate');
const { solicitudIdParamSchema, detalleIdParamSchema } = require('../validations/paramSchemas');
const { detalleSchema } = require('../validations/solicitudDetalleValidation');

/**
 * @swagger
 * /solicitudes/{solicitudId}/detalles:
 *   post:
 *     summary: Agregar un detalle a una solicitud
 *     tags: [Detalles de Solicitud]
 *     parameters:
 *       - in: path
 *         name: solicitudId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Detalle'
 *     responses:
 *       201:
 *         description: Detalle agregado exitosamente
 * components:
  schemas:
    Detalle:
      type: object
      properties:
        insumoid:
          type: integer
          example: 1
        cantidad:
          type: number
          example: 5
        preciounitario:
          type: number
          example: 150.75
      required:
        - insumoid
        - cantidad
        - preciounitario

 */
router.post(
  '/solicitudes/:solicitudId/detalles',
  validate({ params: solicitudIdParamSchema, body: detalleSchema }),
  solicitudDetalleController.agregarDetalle
);

/**
 * @swagger
 * /solicitudes/{solicitudId}/detalles:
 *   get:
 *     summary: Listar los detalles de una solicitud
 *     tags: [Detalles de Solicitud]
 *     parameters:
 *       - in: path
 *         name: solicitudId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Lista de detalles
 */
router.get(
  '/solicitudes/:solicitudId/detalles',
  validate({ params: solicitudIdParamSchema }),
  solicitudDetalleController.listarDetallesPorSolicitud
);

/**
 * @swagger
 * /detalles/{detalleId}:
 *   get:
 *     summary: Obtener un detalle por ID
 *     tags: [Detalles de Solicitud]
 *     parameters:
 *       - in: path
 *         name: detalleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle
 *     responses:
 *       200:
 *         description: Detalle encontrado
 */
router.get('/detalles/:detalleId', validate({ params: detalleIdParamSchema }), solicitudDetalleController.obtenerDetallePorId);

module.exports = router;