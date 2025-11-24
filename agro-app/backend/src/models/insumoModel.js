const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Insumo = db.define('Insumo', {
  insumoid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  proveedorid: {
    type: DataTypes.INTEGER
  },
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  stock: {
    type: DataTypes.INTEGER
  },
  stock_minimo: {
    type: DataTypes.INTEGER
  },
  activo: {
  type: DataTypes.BOOLEAN,
  defaultValue: true
}

}, {
  tableName: 'insumo',
  timestamps: false
});

module.exports = Insumo;