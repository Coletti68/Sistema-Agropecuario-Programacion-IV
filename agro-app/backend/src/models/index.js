const db = require('../config/db');

// Importamos todos los modelos
const Rol = require('./rolModel');
const Usuario = require('./usuarioModel');
const Cultivo = require('./cultivoModel');
const UsuarioCultivo = require('./usuarioCultivoModel');
const Solicitud = require('./solicitudModel');
const SolicitudDetalle = require('./solicitudDetalleModel');
const Pago = require('./pagoModel');
const Proveedor = require('./proveedorModel');
const Insumo = require('./insumoModel');
const EstadoSolicitud = require('./estadoSolicitudModel');
const HistorialEstadoSolicitud = require('./historialEstadoSolicitudModel');
const HistorialCultivo = require('./historialCultivoModel');
const ComprobanteEntrega = require('./comprobanteEntregaModel');

// Agrupamos todos los modelos
const models = {
  db,
  Rol,
  Usuario,
  Cultivo,
  UsuarioCultivo,
  Solicitud,
  SolicitudDetalle,
  Pago,
  Proveedor,
  Insumo,
  EstadoSolicitud,
  HistorialEstadoSolicitud,
  HistorialCultivo,
  ComprobanteEntrega
};

module.exports = models;