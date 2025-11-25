const cultivoService = require('../services/cultivoService');

// Listar cultivos
const listarCultivos = async (req, res, next) => {
  try {
    console.log("Usuario autenticado:", req.user); // debug
    const usuarioId = req.user.usuarioid;
    const cultivos = await cultivoService.listarCultivosPorUsuario(usuarioId);
    res.status(200).json(cultivos);
  } catch (err) {
    console.error("Error al listar cultivos:", err);
    next(err);
  }
};


// Crear cultivo
const crearCultivo = async (req, res, next) => {
  try {
    const usuarioId = req.user.usuarioid; // viene del middleware de auth
    const cultivo = await cultivoService.crearCultivo(req.validatedBody, usuarioId);
    res.status(201).json(cultivo);
    console.log("POST /usuariocultivo ejecutado");

  } catch (err) {
    next(err);
  }
};



// Actualizar cultivo
const actualizarCultivo = async (req, res, next) => {
  try {
    const cultivoId = req.validatedParams?.id;
    const data = req.validatedBody;

    if (!cultivoId || !data) {
      return res.status(400).json({ error: 'ID o datos inválidos' });
    }

    const cultivo = await cultivoService.actualizarCultivo(cultivoId, data);
    res.status(200).json(cultivo);
  } catch (err) {
    next(err);
  }
};

// Desactivar cultivo
const desactivarCultivo = async (req, res, next) => {
  try {
    const resultado = await cultivoService.desactivarCultivo(
      req.validated.params.id
    );
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};
// Eliminar cultivo
const eliminarCultivo = async (req, res, next) => {
  try {
    const resultado = await cultivoService.eliminarCultivo(req.validated.params.id);
    res.status(204).json(resultado);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  listarCultivos,
  crearCultivo,
  actualizarCultivo,
  desactivarCultivo,
  eliminarCultivo
};
