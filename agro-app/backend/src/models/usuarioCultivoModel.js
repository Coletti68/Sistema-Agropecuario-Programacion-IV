const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UsuarioCultivo = sequelize.define("usuariocultivo", {
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
    tableName: "usuariocultivo",
    timestamps: false
  });

  UsuarioCultivo.associate = (models) => {
    UsuarioCultivo.belongsTo(models.usuario, {
      foreignKey: "usuarioid"
    });
    UsuarioCultivo.belongsTo(models.cultivo, {
      foreignKey: "cultivoid"
    });
    UsuarioCultivo.hasMany(models.historialcultivo, {
      foreignKey: "usuariocultivoid"
    });
  };

  return UsuarioCultivo;
};