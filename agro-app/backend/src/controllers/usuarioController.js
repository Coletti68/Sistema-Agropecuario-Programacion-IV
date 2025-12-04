const usuarioService = require('../services/usuarioService');
const fetch = require("node-fetch");

const listarUsuarios = async (req, res, next) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.status(200).json(usuarios)
  } catch (err) {
    next(err);
  }
};

const registrarUsuario = async (req, res, next) => {
  try {

    const nuevo = await usuarioService.crearUsuario(req.validatedBody);

    // Avisar a Django para que dispare el WebSocket
    await fetch("http://localhost:8000/api/notify-new-user/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        evento: "nuevo_usuario",
        nombre: nuevo.nombre,
        email: nuevo.email,
        rol: nuevo.rolid,
      }),
    });

    // Responder al cliente
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(req.validatedParams.id);
    res.status(200).json(usuario);
  } catch (err) {
    next(err);
  }
};


module.exports = {
  listarUsuarios,
  registrarUsuario,
  obtenerUsuarioPorId
};