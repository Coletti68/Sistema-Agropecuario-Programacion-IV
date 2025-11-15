const cultivoService = require('../services/cultivoService');

// Listar cultivos
const listarCultivos = async (req, res, next) => {
  try {
    const cultivos = await cultivoService.listarCultivos();
    res.status(200).json(cultivos);
  } catch (err) {
    next(err);
  }
};

// Crear cultivo
const crearCultivo = async (req, res, next) => {
  try {
    const cultivo = await cultivoService.crearCultivo(req.validatedBody);
    res.status(200).json(cultivo);
  } catch (err) {
    next(err);
  }
};

// Actualizar cultivo
const actualizarCultivo = async (req, res, next) => {
  try {
    const cultivo = await cultivoService.actualizarCultivo(
      req.validated.params.id,
      req.validatedBody
    );
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

module.exports = {
  listarCultivos,
  crearCultivo,
  actualizarCultivo,
  desactivarCultivo
};
