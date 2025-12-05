const sequelize = require('../config/db');
const Usuario = require('../models/usuarioModel')

async function obtenerUsuarioPorEmail(email) {
  try {
    return await Usuario.findOne({ where: { email } });
  } catch (error) {
    console.error("Error al buscar usuario por email:", error.message);
    throw new Error("No se pudo buscar el usuario por email");
  }
}

async function obtenerUsuarioPorDni(dni) {
  try {
    return await Usuario.findOne({ where: { dni } });
  } catch (error) {
    console.error("Error al buscar usuario por DNI:", error.message);
    throw new Error("No se pudo buscar el usuario por DNI");
  }
}

async function crearUsuario(data) {
  console.log("DATOS RECIBIDOS EN createUsuario:", data);

  try {
    return await Usuario.create(data);
  } catch (error) {
    console.error("DETALLE ERROR SEQUELIZE:", error);
    console.error("Error al crear usuario:", error.message);
    throw new Error("No se pudo crear el usuario");
  }
}

async function listarUsuarios() {
  try {
    return await Usuario.findAll();
  } catch (error) {
    console.error("Error al listar usuarios:", error.message);
    throw new Error("No se pudo obtener la lista de usuarios");
  }
}

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

async function editarUsuario(id, data) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado');

    await usuario.update(data);
    return usuario;
  } catch (error) {
    console.error('Error al editar usuario:', error.message);
    throw new Error('No se pudo editar el usuario');
  }
}

async function desactivarUsuario(id) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) throw new Error('Usuario no encontrado');

    await usuario.update({ activo: false });
    return { mensaje: 'Usuario desactivado exitosamente' };
  } catch (error) {
    console.error('Error al desactivar usuario:', error.message);
    throw new Error('No se pudo desactivar el usuario');
  }
}

async function obtenerPerfil(usuarioid) {
  try {
    const usuario = await Usuario.findByPk(usuarioid, {
      attributes: ['usuarioid', 'nombre', 'email', 'telefono', 'direccion', 'dni', 'rolid']
    });
    if (!usuario) throw new Error('Perfil no encontrado');
    return usuario;
  } catch (error) {
    console.error('Error al obtener perfil:', error.message);
    throw new Error('No se pudo obtener el perfil');
  }
}

async function editarPerfil(usuarioid, data) {
  try {
    const usuario = await Usuario.findByPk(usuarioid);
    if (!usuario) throw new Error('Perfil no encontrado');

    await usuario.update(data);
    return usuario;
  } catch (error) {
    console.error('Error al editar perfil:', error.message);
    throw new Error('No se pudo editar el perfil');
  }
}

module.exports = {
  obtenerUsuarioPorEmail,
  obtenerUsuarioPorDni,
  crearUsuario,
  listarUsuarios,
  obtenerUsuarioPorId,
  editarUsuario,
  desactivarUsuario,
  obtenerPerfil,
  editarPerfil

};
