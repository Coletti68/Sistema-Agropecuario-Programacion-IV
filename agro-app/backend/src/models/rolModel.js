const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Rol = db.define('Rol', {
  rolid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'rol',
  timestamps: false
});

module.exports = Rol;