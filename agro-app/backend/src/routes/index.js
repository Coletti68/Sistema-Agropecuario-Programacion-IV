const express = require('express');
const router = express.Router();

// Importar rutas individuales
const authRoutes = require('./authRoutes');
const comprobanteRoutes = require('./comprobanteRoutes');
const cultivoRoutes = require('./cultivoRoutes');
const historialCultivoRoutes = require('./historialCultivoRoutes');
const historialEstadoSolicitudRoutes = require('./historialEstadoSolicitudRoutes');
const insumoRoutes = require('./insumoRoutes');
const pagoRoutes = require('./pagoRoutes');
const proveedorRoutes = require('./proveedorRoutes');
const solicitudRoutes = require('./solicitudRoutes');
const solicitudDetalleRoutes = require('./solicitudDetalleRoutes');
const usuariocultivoRoutes = require('./usuarioCultivoRoutes');
const usuarioRoutes = require('./usuarioRoutes');

// Asociar cada módulo con su prefijo
router.use('/auth', authRoutes);
router.use('/comprobantes', comprobanteRoutes);
router.use('/cultivos', cultivoRoutes);
router.use('/historial', historialCultivoRoutes);
router.use('/historial-estado', historialEstadoSolicitudRoutes);
router.use('/insumos', insumoRoutes);
router.use('/pagos', pagoRoutes);
router.use('/proveedores', proveedorRoutes);
router.use('/solicitudes', solicitudRoutes);
router.use('/solicitud-detalle', solicitudDetalleRoutes);
router.use('/usuariocultivo',usuariocultivoRoutes);
router.use('/usuarios', usuarioRoutes);




module.exports = router;
