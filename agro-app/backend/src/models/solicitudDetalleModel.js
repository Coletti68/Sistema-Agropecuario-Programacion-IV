const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Insumo = require('./insumoModel');
const Solicitud = require('./solicitudModel');

const SolicitudDetalle = db.define('SolicitudDetalle', {
  solicituddetalleid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  solicitudid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'solicitud',
      key: 'solicitudid'
    }
  },
  insumoid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'insumo',
      key: 'insumoid'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  preciounitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'solicituddetalle',
  timestamps: false
});

SolicitudDetalle.belongsTo(Solicitud, { foreignKey: 'solicitudid' });
SolicitudDetalle.belongsTo(Insumo, { foreignKey: 'insumoid' });

module.exports = SolicitudDetalle;
