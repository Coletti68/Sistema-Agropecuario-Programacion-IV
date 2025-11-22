const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Solicitud = db.define('Solicitud', {
  solicitudid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fechasolicitud: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estadosolicitudid: {
    type: DataTypes.INTEGER,
    defaultValue: 1 // estado inicial
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'solicitud',
  timestamps: false
});


module.exports = Solicitud;