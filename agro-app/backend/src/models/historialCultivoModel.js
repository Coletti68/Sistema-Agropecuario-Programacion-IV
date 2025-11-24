const { DataTypes } = require('sequelize');
const db = require('../config/db');

const HistorialCultivo = db.define('HistorialCultivo', {
  historialid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuariocultivoid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  latitud: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false
  },
  longitud: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  observaciones: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'historialcultivo',
  timestamps: false
});

module.exports = HistorialCultivo;