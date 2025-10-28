// src/models/SolicitudDetalle.js
module.exports = (sequelize, DataTypes) => {
  const SolicitudDetalle = sequelize.define('SolicitudDetalle', {
    detalleid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    solicitudid: { type: DataTypes.INTEGER, allowNull: false },
    insumoid: { type: DataTypes.INTEGER, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'solicituddetalle',
    timestamps: false
  });

  SolicitudDetalle.associate = models => {
    SolicitudDetalle.belongsTo(models.Solicitud, { foreignKey: 'solicitudid' });
    SolicitudDetalle.belongsTo(models.Insumo, { foreignKey: 'insumoid' });
  };

  return SolicitudDetalle;
};