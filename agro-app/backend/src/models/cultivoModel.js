const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Cultivo = db.define('Cultivo', {
  cultivoid: {
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
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'cultivo',
  timestamps: false
});

module.exports = Cultivo;