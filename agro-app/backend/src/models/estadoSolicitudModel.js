const { DataTypes } = require('sequelize');
const db = require('../config/db');

const EstadoSolicitud = db.define('EstadoSolicitud', {
  estadosolicitudid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'estadosolicitud',
  timestamps: false
});

module.exports = EstadoSolicitud;