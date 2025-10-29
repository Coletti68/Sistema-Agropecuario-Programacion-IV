
module.exports = (sequelize, DataTypes) => {
  const Solicitud = sequelize.define('Solicitud', {
    solicitudid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuarioid: { type: DataTypes.INTEGER, allowNull: false },
    fechasolicitud: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    estado_actual: { type: DataTypes.STRING(50), defaultValue: 'Pendiente' }
  }, {
    tableName: 'solicitud',
    timestamps: false
  });

  Solicitud.associate = models => {
    Solicitud.belongsTo(models.Usuario, { foreignKey: 'usuarioid' });
    Solicitud.hasMany(models.SolicitudDetalle, { foreignKey: 'solicitudid' });
  };

  return Solicitud;
};