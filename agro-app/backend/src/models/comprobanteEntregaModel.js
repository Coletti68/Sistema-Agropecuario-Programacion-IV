
module.exports = (sequelize, DataTypes) => {
  const ComprobanteEntrega = sequelize.define('ComprobanteEntrega', {
    comprobanteid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    solicitudid: { type: DataTypes.INTEGER, allowNull: false },
    fecha_entrega: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    entregado_por: { type: DataTypes.STRING(100), allowNull: false },
    recibido_por: { type: DataTypes.STRING(100), allowNull: false },
    observaciones: { type: DataTypes.TEXT }
  }, {
    tableName: 'comprobanteentrega',
    timestamps: false
  });

  ComprobanteEntrega.associate = models => {
    ComprobanteEntrega.belongsTo(models.Solicitud, { foreignKey: 'solicitudid' });
  };

  return ComprobanteEntrega;
};