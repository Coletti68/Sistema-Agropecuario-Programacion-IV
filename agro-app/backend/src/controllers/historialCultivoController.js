const historialCultivoService = require('../services/historialCultivoService');

const registrarCambio = async (req, res, next) => {
  try {
    const registro = await historialCultivoService.registrarCambio(req.validatedBody);
    res.status(201).json(registro);
  } catch (err) {
    next(err);
  }
};

const listarHistorial = async (req, res, next) => {
  try {
    const historial = await historialCultivoService.listarHistorial();
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const registro = await historialCultivoService.obtenerPorId(req.validated.params.id);
    res.status(200).json(registro);
  } catch (err) {
    next(err);
  }
};

const eliminarRegistro = async (req, res, next) => {
  try {
    const resultado = await historialCultivoService.eliminarRegistro(req.validated.params.id);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

const listarPorUsuario = async (req, res, next) => {
  try {
    const historial = await historialCultivoService.listarPorUsuario(req.validated.params.usuarioId);
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

const listarPorAsignacion = async (req, res, next) => {
  try {
    const historial = await historialCultivoService.listarPorAsignacion(req.validated.params.usuariocultivoId);
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

const listarConDetalles = async (req, res, next) => {
  try {
    const historial = await historialCultivoService.listarConDetalles(req.validated.params.usuariocultivoId);
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registrarCambio,
  listarHistorial,
  obtenerPorId,
  eliminarRegistro,
  listarPorUsuario,
  listarPorAsignacion,
  listarConDetalles
};