const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SolicitudDetalle = sequelize.define('SolicitudDetalle', {
    solicituddetalleid: { 
      type: DataTypes.INTEGER,
       primaryKey: true,
        autoIncrement: true 
      },
    solicitudid: { 
      type: DataTypes.INTEGER,
       allowNull: false 
      },
    insumoid: {
       type: DataTypes.INTEGER,
        allowNull: false 
      },
    cantidad: {
       type: DataTypes.INTEGER,
        allowNull: false 
      },
    preciounitario: { 
      type: DataTypes.DECIMAL(10,2),
       allowNull: false 
      },
    activo: { 
      type: DataTypes.BOOLEAN,
       defaultValue: true 
      }
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