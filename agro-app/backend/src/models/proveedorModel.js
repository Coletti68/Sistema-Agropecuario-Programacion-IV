const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Proveedor = db.define('Proveedor', {
  proveedorid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  contacto: {
    type: DataTypes.STRING(100)
  },
  telefono: {
    type: DataTypes.STRING(30)
  },
  email: {
    type: DataTypes.STRING(100)
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'proveedor',
  timestamps: false
});

module.exports = Proveedor;