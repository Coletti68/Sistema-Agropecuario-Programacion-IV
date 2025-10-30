module.exports = (sequelize, DataTypes) => {
  const HistorialEstadoSolicitud = sequelize.define('HistorialEstadoSolicitud', {
    historialid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    solicitudid: {
      type: DataTypes.INTEGER,
      allowNull: false 
    },
    estadosolicitudid: {
       type: DataTypes.INTEGER, 
       allowNull: false 
    },
    usuarioid: { 
      type: DataTypes.INTEGER 
    },
    fecha: {
       type: DataTypes.DATE, 
       defaultValue: DataTypes.NOW 
      }
  }, {
    tableName: 'historialestadosolicitud',
    timestamps: false
  });

  HistorialEstadoSolicitud.associate = models => {
    HistorialEstadoSolicitud.belongsTo(models.Solicitud, { foreignKey: 'solicitudid' });
    HistorialEstadoSolicitud.belongsTo(models.EstadoSolicitud, { foreignKey: 'estadosolicitudid' });
    HistorialEstadoSolicitud.belongsTo(models.Usuario, { foreignKey: 'usuarioid' });
  };

  return HistorialEstadoSolicitud;
};