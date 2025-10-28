// src/models/Proveedor.js
module.exports = (sequelize, DataTypes) => {
  const Proveedor = sequelize.define('Proveedor', {
    proveedorid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    contacto: { type: DataTypes.STRING(100) },
    telefono: { type: DataTypes.STRING(30) },
    direccion: { type: DataTypes.STRING(255) }
  }, {
    tableName: 'proveedor',
    timestamps: false
  });

  Proveedor.associate = models => {
    Proveedor.hasMany(models.Insumo, { foreignKey: 'proveedorid' });
  };

  return Proveedor;
};