
module.exports = (sequelize, DataTypes) => {
 const Solicitud = sequelize.define('Solicitud', {
    solicitudid: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
       autoIncrement: true
       },
    usuarioid: { 
      type: DataTypes.INTEGER,
       allowNull: false 
      },
    fechasolicitud: {
       type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
       },
    activo: { 
      type: DataTypes.BOOLEAN,
       defaultValue: true 
      }
  }, {


    tableName: 'solicitud',
    timestamps: false
  });

  Solicitud.associate = models => {
    Solicitud.belongsTo(models.Usuario, { foreignKey: 'usuarioid' });
    Solicitud.hasMany(models.SolicitudDetalle, { foreignKey: 'solicitudid' });
    Solicitud.hasMany(models.HistorialEstadoSolicitud, { foreignKey: 'solicitudid' });
    Solicitud.hasMany(models.Pago, { foreignKey: 'solicitudid' });
    Solicitud.hasOne(models.ComprobanteEntrega, { foreignKey: 'solicitudid' });
  };


  return Solicitud;
};