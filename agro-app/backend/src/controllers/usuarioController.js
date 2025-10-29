// src/controllers/usuarioController.js
const UsuarioRegisterDTO = require('../DTos/Usuario/UsuarioRegisterDTO');
const UsuarioResponseDTO = require('../DTos/Usuario/UsuarioResponseDTO');
const {
  listarUsuarios,
  registrarUsuario,
  obtenerUsuarioPorId
} = require('../services/usuarioService');

async function getUsuarios(req, res) {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios.map(u => new UsuarioResponseDTO(u)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function postUsuario(req, res) {
  try {
    const dto = new UsuarioRegisterDTO(req.body);
    const nuevo = await registrarUsuario(dto);
    res.status(201).json(new UsuarioResponseDTO(nuevo));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getUsuarioPorId(req, res) {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);
    res.json(new UsuarioResponseDTO(usuario));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getUsuarios,
  postUsuario,
  getUsuarioPorId
};