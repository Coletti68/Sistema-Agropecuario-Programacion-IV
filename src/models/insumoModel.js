
module.exports = (sequelize, DataTypes) => {
  const Insumo = sequelize.define('Insumo', {
    insumoid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    precio_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock_actual: { type: DataTypes.INTEGER, defaultValue: 0 },
    proveedorid: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'insumo',
    timestamps: false
  });

  Insumo.associate = models => {
    Insumo.belongsTo(models.Proveedor, { foreignKey: 'proveedorid' });
    Insumo.hasMany(models.SolicitudDetalle, { foreignKey: 'insumoid' });
  };

  return Insumo;
};