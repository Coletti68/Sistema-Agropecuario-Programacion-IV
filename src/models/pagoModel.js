
module.exports = (sequelize, DataTypes) => {
  const Pago = sequelize.define('Pago', {
    pagoid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    solicitudid: { type: DataTypes.INTEGER, allowNull: false },
    metodo: { type: DataTypes.STRING(50), allowNull: false },
    monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    fecha_pago: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    confirmado: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'pago',
    timestamps: false
  });

  Pago.associate = models => {
    Pago.belongsTo(models.Solicitud, { foreignKey: 'solicitudid' });
  };

  return Pago;
};