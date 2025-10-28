// src/services/usuarioService.js
const { Usuario } = require('../models/usuarioModel');

async function listarUsuarios() {
  try {
    return await Usuario.findAll();
  } catch (error) {
    console.error("Error al listar usuarios:", error.message);
    throw new Error("No se pudo obtener la lista de usuarios");
  }
}

async function registrarUsuario(dto) {
  try {
    dto.validate();
    return await Usuario.create({
      rolid: dto.rolid,
      nombre: dto.nombre,
      email: dto.email,
      telefono: dto.telefono,
      dni: dto.dni,
      direccion: dto.direccion,
      passwordhash: dto.passwordhash
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    throw new Error("No se pudo registrar el usuario");
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

module.exports = {
  listarUsuarios,
  registrarUsuario,
  obtenerUsuarioPorId
};