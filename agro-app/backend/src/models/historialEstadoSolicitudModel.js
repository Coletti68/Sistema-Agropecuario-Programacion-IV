const { DataTypes } = require('sequelize');
const db = require('../config/db');

const HistorialEstadoSolicitud = db.define('HistorialEstadoSolicitud', {
  historialid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  solicitudid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estadosolicitudid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioid: {
    type: DataTypes.INTEGER
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'historialestadosolicitud',
  timestamps: false
});

module.exports = HistorialEstadoSolicitud;