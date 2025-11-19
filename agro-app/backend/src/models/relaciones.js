const {
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
} = require('./index');

// Roles y usuarios
Rol.hasMany(Usuario, { foreignKey: 'rolid' });
Usuario.belongsTo(Rol, { foreignKey: 'rolid' });

// Usuario y cultivos
Usuario.hasMany(UsuarioCultivo, { foreignKey: 'usuarioid' });
UsuarioCultivo.belongsTo(Usuario, { foreignKey: 'usuarioid' });

Cultivo.hasMany(UsuarioCultivo, { foreignKey: 'cultivoid' });
UsuarioCultivo.belongsTo(Cultivo, { foreignKey: 'cultivoid' });

// Historial de cultivos
Usuario.hasMany(HistorialCultivo, { foreignKey: 'usuarioid' });
HistorialCultivo.belongsTo(Usuario, { foreignKey: 'usuarioid' });

UsuarioCultivo.hasMany(HistorialCultivo, { foreignKey: 'usuariocultivoid' });
HistorialCultivo.belongsTo(UsuarioCultivo, { foreignKey: 'usuariocultivoid' });

// Solicitudes
Usuario.hasMany(Solicitud, { foreignKey: 'usuarioid' });
Solicitud.belongsTo(Usuario, { foreignKey: 'usuarioid' });

Solicitud.hasMany(SolicitudDetalle, { foreignKey: 'solicitudid' });
SolicitudDetalle.belongsTo(Solicitud, { foreignKey: 'solicitudid' });

Insumo.hasMany(SolicitudDetalle, { foreignKey: 'insumoid' });
SolicitudDetalle.belongsTo(Insumo, { foreignKey: 'insumoid' });

// Pagos
Solicitud.hasMany(Pago, { foreignKey: 'solicitudid' });
Pago.belongsTo(Solicitud, { foreignKey: 'solicitudid' });

Usuario.hasMany(Pago, { foreignKey: 'usuarioid' });
Pago.belongsTo(Usuario, { foreignKey: 'usuarioid' });

// Insumos y proveedores
Proveedor.hasMany(Insumo, { foreignKey: 'proveedorid' });
Insumo.belongsTo(Proveedor, { foreignKey: 'proveedorid' });

// Estados y historial
Solicitud.hasMany(HistorialEstadoSolicitud, { foreignKey: 'solicitudid' });
HistorialEstadoSolicitud.belongsTo(Solicitud, { foreignKey: 'solicitudid' });

EstadoSolicitud.hasMany(HistorialEstadoSolicitud, { foreignKey: 'estadosolicitudid' });
HistorialEstadoSolicitud.belongsTo(EstadoSolicitud, { foreignKey: 'estadosolicitudid' });

Usuario.hasMany(HistorialEstadoSolicitud, { foreignKey: 'usuarioid' });
HistorialEstadoSolicitud.belongsTo(Usuario, { foreignKey: 'usuarioid' });

// Comprobante de entrega
Solicitud.hasMany(ComprobanteEntrega, { foreignKey: 'solicitudid' });
ComprobanteEntrega.belongsTo(Solicitud, { foreignKey: 'solicitudid' });

Usuario.hasMany(ComprobanteEntrega, { foreignKey: 'entregadopor', as: 'entregados' });
ComprobanteEntrega.belongsTo(Usuario, { foreignKey: 'entregadopor', as: 'entregador' });

Usuario.hasMany(ComprobanteEntrega, { foreignKey: 'recibidopor', as: 'recibidos' });
ComprobanteEntrega.belongsTo(Usuario, { foreignKey: 'recibidopor', as: 'receptor' });