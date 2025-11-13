const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Proveedor = sequelize.define('Proveedor', {
    proveedorid: { 
      type: DataTypes.INTEGER,
       primaryKey: true, 
       autoIncrement: true 
      },
    nombre: { 
      type: DataTypes.STRING(100), 
      allowNull: false 
    },
    contacto: { 
      type: DataTypes.STRING(100) 
    },
    telefono: { 
      type: DataTypes.STRING(30) 
    },
    email: { 
      type: DataTypes.STRING(255) 
    },
    activo: {
       type: DataTypes.BOOLEAN, defaultValue: true 
      }
  }, {
    tableName: 'proveedor',
    timestamps: false
  });

  Proveedor.associate = models => {
    Proveedor.hasMany(models.Insumo, { foreignKey: 'proveedorid' });
  };

  return Proveedor;
};