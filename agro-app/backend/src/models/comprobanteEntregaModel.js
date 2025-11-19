const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ComprobanteEntrega = db.define('ComprobanteEntrega', {
  comprobanteid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  solicitudid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fechaentrega: {
    type: DataTypes.DATE
  },
  total: {
    type: DataTypes.DECIMAL(12, 2)
  },
  entregadopor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  recibidopor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'comprobanteentrega',
  timestamps: false
});

module.exports = ComprobanteEntrega;