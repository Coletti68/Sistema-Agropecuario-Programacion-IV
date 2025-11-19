const { DataTypes } = require('sequelize');
const db = require('../config/db');

const UsuarioCultivo = db.define('UsuarioCultivo', {
  usuariocultivoid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cultivoid: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  latitud: {
    type: DataTypes.DECIMAL(10, 8)
  },
  longitud: {
    type: DataTypes.DECIMAL(11, 8)
  },
  fechasiembra: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'usuariocultivo',
  timestamps: false
});

module.exports = UsuarioCultivo;