const historialService = require('../services/historialEstadoSolicitudService');

const registrarCambioEstado = async (req, res, next) => {
  try {
    const { solicitudid, estadosolicitudid, usuarioid } = req.validatedBody;
    const resultado = await historialService.registrarCambioEstado(solicitudid, estadosolicitudid, usuarioid);
    res.status(201).json(resultado);
  } catch (err) {
    next(err);
  }
};

const listarHistorial = async (req, res, next) => {
  try {
    const historial = await historialService.listarHistorial();
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const registro = await historialService.obtenerPorId(id);
    res.status(200).json(registro);
  } catch (err) {
    next(err);
  }
};

const listarPorSolicitud = async (req, res, next) => {
  try {
    const { solicitudId } = req.validatedParams;
    const historial = await historialService.listarPorSolicitud(solicitudId);
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

const listarPorUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.validatedParams;
    const historial = await historialService.listarPorUsuario(usuarioId);
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

const listarConDetalles = async (req, res, next) => {
  try {
    const { solicitudId } = req.validatedParams;
    const historial = await historialService.listarConDetalles(solicitudId);
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registrarCambioEstado,
  listarHistorial,
  obtenerPorId,
  listarPorSolicitud,
  listarPorUsuario,
  listarConDetalles
};
