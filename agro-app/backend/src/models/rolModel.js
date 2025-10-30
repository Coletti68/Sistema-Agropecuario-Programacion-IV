module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define("rol", {
    rolid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: "rol",
    timestamps: false
  });

  Rol.associate = (models) => {
    Rol.hasMany(models.usuario, { foreignKey: "rolid" });
  };

  return Rol;
};