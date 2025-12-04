const express = require('express');
const router = express.Router();
const usuarioCultivoController = require('../controllers/usuarioCultivoController');
const validate = require('../middlewares/validate');
const { usuarioCultivoSchema } = require('../validations/usuarioCultivoValidation');
const { usuariocultivoIdParamSchema, usuarioIdParamSchema, cultivoIdParamSchema } = require('../validations/paramSchemas');
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * tags:
 *   name: UsuarioCultivo
 *   description: Gestión de asignaciones de cultivos a usuarios
 */

/**
 * @swagger
 * /usuariocultivo:
 *   post:
 *     summary: Crea una nueva asignación de cultivo a un usuario
 *     tags: [UsuarioCultivo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCultivo'
 *           example:
 *             usuarioid: 1
 *             cultivoid: 2
 *             latitud: -12.046374
 *             longitud: -77.042793
 *             fechasiembra: "2025-11-21T10:00:00.000Z"
 *     responses:
 *       200:
 *         description: Asignación creada correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  '/',
  validate({ body: usuarioCultivoSchema }),
  usuarioCultivoController.crearAsignacion
);
/**
 * @swagger
 * /usuariocultivo:
 *   get:
 *     summary: Lista todas las asignaciones de cultivos
 *     tags: [UsuarioCultivo]
 *     responses:
 *       200:
 *         description: Lista de asignaciones obtenida
 */
router.get('/', usuarioCultivoController.listarAsignaciones);

/**
 * @swagger
 * /usuariocultivo/{usuariocultivoId}:
 *   get:
 *     summary: Obtiene una asignación específica por ID
 *     tags: [UsuarioCultivo]
 *     parameters:
 *       - in: path
 *         name: usuariocultivoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asignación
 *     responses:
 *       200:
 *         description: Asignación encontrada
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Asignación no encontrada
 */
router.get('/:usuariocultivoId', validate({ params: usuariocultivoIdParamSchema }), usuarioCultivoController.obtenerAsignacionPorId);

/**
 * @swagger
 * /usuariocultivo/{usuariocultivoId}:
 *   put:
 *     summary: Actualiza una asignación existente
 *     tags: [UsuarioCultivo]
 *     parameters:
 *       - in: path
 *         name: usuariocultivoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asignación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCultivo'
 *           example:
 *             usuarioid: 1
 *             cultivoid: 2
 *             latitud: -12.050000
 *             longitud: -77.040000
 *             fechasiembra: "2025-12-01T10:00:00.000Z"
 *     responses:
 *       200:
 *         description: Asignación actualizada correctamente
 */
router.put('/:usuariocultivoId', validate({ params: usuariocultivoIdParamSchema, body: usuarioCultivoSchema }), usuarioCultivoController.actualizarAsignacion);

/**
 * @swagger
 * /usuariocultivo/{usuariocultivoId}:
 *   delete:
 *     summary: Elimina una asignación de cultivo
 *     tags: [UsuarioCultivo]
 *     parameters:
 *       - in: path
 *         name: usuariocultivoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asignación a eliminar
 *     responses:
 *       200:
 *         description: Asignación eliminada correctamente
 */
router.delete('/:usuariocultivoId', validate({ params: usuariocultivoIdParamSchema }), usuarioCultivoController.eliminarAsignacion);

/**
 * @swagger
 * /usuariocultivo/usuario/{usuarioId}:
 *   get:
 *     summary: Lista los cultivos asignados a un usuario
 *     tags: [UsuarioCultivo]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de cultivos obtenida correctamente
 */
router.get('/usuario/:id', validate({ params: usuarioIdParamSchema }), usuarioCultivoController.listarCultivosPorUsuario);

/**
 * @swagger
 * /usuariocultivo/cultivo/{cultivoId}:
 *   get:
 *     summary: Lista asignaciones de un cultivo específico
 *     tags: [UsuarioCultivo]
 *     parameters:
 *       - in: path
 *         name: cultivoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cultivo
 *     responses:
 *       200:
 *         description: Lista de asignaciones del cultivo obtenida
 */
router.get('/cultivo/:cultivoId', validate({ params: cultivoIdParamSchema }), usuarioCultivoController.buscarPorCultivo);

/**
 * @swagger
 * /usuariocultivo/ubicacion:
 *   get:
 *     summary: Busca asignaciones por ubicación (latitud y longitud)
 *     tags: [UsuarioCultivo]
 *     parameters:
 *       - in: query
 *         name: latitud
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: longitud
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Lista de asignaciones encontrada
 */
router.get('/ubicacion', usuarioCultivoController.buscarPorUbicacion);


router.post('/cultivo-completo', authMiddleware, usuarioCultivoController.crearCultivoCompleto);
/**
 * @swagger
 * /usuariocultivo/historial/{id}:
 *   get:
 *     summary: Lista asignaciones de un usuario con historial
 *     tags: [UsuarioCultivo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de asignaciones con historial obtenida
 */
router.get('/historial/:id', validate({ params: usuarioIdParamSchema }), usuarioCultivoController.listarConHistorial);

/**
 * @swagger
 * /usuariocultivo/mis-cultivos/{usuariocultivoId}:
 *   put:
 *     summary: Edita asignación específica de un usuario
 *     tags: [UsuarioCultivo]
 *     parameters:
 *       - in: path
 *         name: usuariocultivoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asignación a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCultivo'
 *           example:
 *             usuarioid: 1
 *             cultivoid: 3
 *             latitud: -12.046500
 *             longitud: -77.043000
 *             fechasiembra: "2025-12-05T10:00:00.000Z"
 *     responses:
 *       200:
 *         description: Asignación editada correctamente
 */
router.put('/mis-cultivos/:usuariocultivoId', validate({ params: usuariocultivoIdParamSchema, body: usuarioCultivoSchema }), usuarioCultivoController.editarAsignacionDelUsuario);

/**
 * @swagger
 * /usuariocultivo/mis-cultivos/{usuariocultivoId}:
 *   delete:
 *     summary: Desactiva una asignación específica de un usuario
 *     tags: [UsuarioCultivo]
 *     parameters:
 *       - in: path
 *         name: usuariocultivoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asignación a desactivar
 *     responses:
 *       200:
 *         description: Asignación desactivada correctamente
 */
router.delete('/mis-cultivos/:usuariocultivoId', validate({ params: usuariocultivoIdParamSchema }), usuarioCultivoController.desactivarAsignacionDelUsuario);

module.exports = router;
