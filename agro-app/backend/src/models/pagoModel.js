const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Pago = db.define('Pago', {
  pagoid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  solicitudid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_pago: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  monto: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  metodo_pago: {
    type: DataTypes.STRING(50)
  },
  estado_pago: {
    type: DataTypes.STRING(20),
    defaultValue: 'pendiente'
  },
  observaciones: {
    type: DataTypes.TEXT
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'pago',
  timestamps: false
});

module.exports = Pago;