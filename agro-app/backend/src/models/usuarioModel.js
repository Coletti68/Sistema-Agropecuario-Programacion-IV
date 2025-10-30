
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    usuarioid: { type: DataTypes.INTEGER,
       primaryKey: true, 
       autoIncrement: true 
      },
    rolid: { 
      type: DataTypes.INTEGER,
       allowNull: false 
      },
    nombre: { 
      type: DataTypes.STRING(100),
       allowNull: false 
      },
    email: { 
      type: DataTypes.STRING(100), 
      allowNull: false, 
      unique: true
    },
    telefono: { 
      type: DataTypes.STRING(30) 
    },
    dni: { 
      type: DataTypes.STRING(20),
       unique: true 
      },
    direccion: { 
      type: DataTypes.STRING(255) 
    },
    passwordhash: { 
      type: DataTypes.STRING(255), 
      allowNull: false 
    },
    activo: {
       type: DataTypes.BOOLEAN, 
       defaultValue: true 
      }
  }, {
    tableName: 'usuario',
    timestamps: false
  });

  Usuario.associate = models => {
    Usuario.belongsTo(models.Rol, { foreignKey: 'rolid' });
    Usuario.hasMany(models.Solicitud, { foreignKey: 'usuarioid' });
    Usuario.hasMany(models.UsuarioCultivo, { foreignKey: 'usuarioid' });
    Usuario.hasMany(models.HistorialCultivo, { foreignKey: 'usuarioid' });
    Usuario.hasMany(models.HistorialEstadoSolicitud, { foreignKey: 'usuarioid' });
    Usuario.hasMany(models.Pago, { foreignKey: 'usuarioid' });
  };

  return Usuario;
};
