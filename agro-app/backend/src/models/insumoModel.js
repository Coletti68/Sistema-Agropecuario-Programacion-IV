const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Insumo = sequelize.define('Insumo', {
    insumoid: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
       autoIncrement: true 
      },
    nombre: { 
      type: DataTypes.STRING(100),
       allowNull: false 
      },
    descripcion: { 
      type: DataTypes.TEXT
     },
    precio: {
       type: DataTypes.DECIMAL(10,2),
        allowNull: false 
      },
    proveedorid: {
       type: DataTypes.INTEGER 
      },
    estado: {
       type: DataTypes.INTEGER, 
       defaultValue: 1 
      },
    stock: {
       type: DataTypes.INTEGER 
      },
    stock_minimo: { 
      type: DataTypes.INTEGER 
    }
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