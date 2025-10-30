
module.exports = (sequelize, DataTypes) => {
  const ComprobanteEntrega = sequelize.define('ComprobanteEntrega', {
    comprobanteid: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    solicitudid: {
       type: DataTypes.INTEGER,
        allowNull: false
       },
    fecha_entrega: {
       type: DataTypes.DATE, 
       defaultValue: DataTypes.NOW 
      },
    total: {
       type: DataTypes.DECIMAL(12,2)
       },
       entregadopor: { 
        type: DataTypes.INTEGER,
        allowNull: false 
      },
    recibidopor: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    activo: { 
      type: DataTypes.BOOLEAN, defaultValue: true 
        }

  }, {
    tableName: 'comprobanteentrega',
    timestamps: false
  });

  comprobanteentrega.associate = (models) => {
    comprobanteentrega.belongsTo(models.solicitud, { foreignKey: "solicitudid" });
    comprobanteentrega.belongsTo(models.usuario, { foreignKey: "entregadopor", as: "entregador" });
    comprobanteentrega.belongsTo(models.usuario, { foreignKey: "recibidopor", as: "receptor" });
  };


  return ComprobanteEntrega;
};