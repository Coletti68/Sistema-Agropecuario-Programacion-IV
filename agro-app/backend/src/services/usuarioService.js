const sequelize = require('../config/db');
const Usuario = require('../models/usuarioModel')(sequelize);

// 🔍 Buscar por email
async function obtenerUsuarioPorEmail(email) {
  try {
    return await Usuario.findOne({ where: { email } });
  } catch (error) {
    console.error("Error al buscar usuario por email:", error.message);
    throw new Error("No se pudo buscar el usuario por email");
  }
}

// 🔍 Buscar por DNI
async function obtenerUsuarioPorDni(dni) {
  try {
    return await Usuario.findOne({ where: { dni } });
  } catch (error) {
    console.error("Error al buscar usuario por DNI:", error.message);
    throw new Error("No se pudo buscar el usuario por DNI");
  }
}

// 🆕 Crear usuario (sin DTO)
async function crearUsuario(data) {
  const camposObligatorios = ['rolid', 'nombre', 'email', 'telefono', 'dni', 'direccion', 'passwordhash'];
  for (const campo of camposObligatorios) {
    if (!data[campo] || typeof data[campo] !== 'string' && typeof data[campo] !== 'number') {
      throw new Error(`El campo '${campo}' es obligatorio`);
    }
}

  try {
    return await Usuario.create(data);
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    throw new Error("No se pudo crear el usuario");
  }
}

// 🧾 Listar todos
async function listarUsuarios() {
  try {
    return await Usuario.findAll();
  } catch (error) {
    console.error("Error al listar usuarios:", error.message);
    throw new Error("No se pudo obtener la lista de usuarios");
  }
}

// 🔍 Buscar por ID
async function obtenerUsuarioPorId(id) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error("Usuario no encontrado");
    return usuario;
  } catch (error) {
    console.error("Error al obtener usuario:", error.message);
    throw new Error("No se pudo obtener el usuario");
  }
}

module.exports = {
  obtenerUsuarioPorEmail,
  obtenerUsuarioPorDni,
  crearUsuario,
  listarUsuarios,
  obtenerUsuarioPorId
};
