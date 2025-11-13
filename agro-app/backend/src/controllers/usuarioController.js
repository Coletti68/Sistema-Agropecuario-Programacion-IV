const usuarioService = require('../services/usuarioService');

const listarUsuarios = async (req,res,next) => {
  try {
    const usuarios = await usuarioService.listarUsuarios(); 
    res.status(200).json(usuarios)
    } catch (err) {
    next(err);
  }
};

const registrarUsuario = async (req,res,next) => {
  try {
    const nuevo = await usuarioService.crearUsuario(req.validatedBody);
    res.status(200).json(nuevo);
  } catch (err) {
    next(err);
  }
};

const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(req.validated.params.id);
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