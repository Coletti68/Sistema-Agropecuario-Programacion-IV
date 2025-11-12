const Usuario = require('./usuarioModel');
const Cultivo = require('./cultivoModel');
const UsuarioCultivo = require('./usuarioCultivoModel');
const Solicitud = require('./solicitudModel');
const SolicitudDetalle = require('./solicitudDetalleModel');
const Proveedor = require('./proveedorModel');
const Pago = require('./pagoModel');
const Insumo = require('./insumoModel');
const EstadoSolicitud = require('./estadoSolicitudModel');
const HistorialEstadoSolicitud = require('./historialEstadoSolicitudModel');
const HistorialCultivo = require('./historialCultivoModel');
const ComprobanteEntrega = require('./comprobanteEntregaModel');


module.exports = {
  Usuario,
  Cultivo,
  UsuarioCultivo,
  Solicitud,
  SolicitudDetalle,
  Proveedor,
  Pago,
  Insumo,
  EstadoSolicitud,
  HistorialEstadoSolicitud,
  HistorialCultivo,
  ComprobanteEntrega
};
