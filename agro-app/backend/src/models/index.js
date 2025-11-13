const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db');

// Inicializamos Sequelize
const sequelize = new Sequelize(dbConfig);

// Importamos los modelos pasándole la instancia de sequelize
const Usuario = require('./usuarioModel')(sequelize);
const Cultivo = require('./cultivoModel')(sequelize);
const UsuarioCultivo = require('./usuarioCultivoModel')(sequelize);
const Solicitud = require('./solicitudModel')(sequelize);
const SolicitudDetalle = require('./solicitudDetalleModel')(sequelize);
const Proveedor = require('./proveedorModel')(sequelize);
const Pago = require('./pagoModel')(sequelize);
const Insumo = require('./insumoModel')(sequelize);
const EstadoSolicitud = require('./estadoSolicitudModel')(sequelize);
const HistorialEstadoSolicitud = require('./historialEstadoSolicitudModel')(sequelize);
const HistorialCultivo = require('./historialCultivoModel')(sequelize);
const ComprobanteEntrega = require('./comprobanteEntregaModel')(sequelize);

// Agrupamos los modelos
const models = {
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

// Configuramos las asociaciones (si cada modelo las define)
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

// Exportamos todo
models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
