module.exports = (sequelize, DataTypes) => {
  const EstadoSolicitud = sequelize.define('EstadoSolicitud', {
    estadosolicitudid: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    nombre: {
       type: DataTypes.STRING(50), 
       allowNull: false 
      }
  }, {
    tableName: 'estadosolicitud',
    timestamps: false
  });

  EstadoSolicitud.associate = models => {
    EstadoSolicitud.hasMany(models.HistorialEstadoSolicitud, { foreignKey: 'estadosolicitudid' });
  };

  return EstadoSolicitud;
};