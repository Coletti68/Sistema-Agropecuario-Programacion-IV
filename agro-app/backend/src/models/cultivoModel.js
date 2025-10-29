
module.exports = (sequelize, DataTypes) => {
  const Cultivo = sequelize.define('Cultivo', {
    cultivoid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    descripcion: { type: DataTypes.TEXT }
  }, {
    tableName: 'cultivo',
    timestamps: false
  });

  Cultivo.associate = models => {
    Cultivo.hasMany(models.UsuarioCultivo, { foreignKey: 'cultivoid' });
  };

  return Cultivo;
};