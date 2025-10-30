module.exports = (sequelize, DataTypes) => {
    const HistorialCultivo = sequelize.define("historialcultivo", {
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
        allowNull: false,
      },
      latitud: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: false,
      },
      longitud: {
        type: DataTypes.DECIMAL(11,8),
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      observaciones: {
        type: DataTypes.TEXT
      }
    },
    {
        tableName: "historialcultivo",
        timestamps: false
    });

    HistorialCultivo.associate = (models) => {
    HistorialCultivo.belongsTo(models.usuario, {
      foreignKey: "usuarioid"
    });
    HistorialCultivo.belongsTo(models.usuariocultivo, {
      foreignKey: "usuariocultivoid"
    });
  };

  return HistorialCultivo;
};