const solicitudService = require('../services/solicitudService');

// Crear solicitud
const crearSolicitud = async (req, res, next) => {
  try {
    const { id: usuarioId } = req.validatedParams;
    const nuevo = await solicitudService.crearSolicitud(usuarioId);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

// Listar todas las solicitudes
const listarSolicitudes = async (req, res, next) => {
  try {
    const solicitudes = await solicitudService.listarSolicitudes();
    res.status(200).json(solicitudes);
  } catch (err) {
    next(err);
  }
};

// Listar solicitudes por usuario
const listarSolicitudesPorUsuario = async (req, res, next) => {
  try {
    const { id: usuarioId } = req.validatedParams;
    const solicitudes = await solicitudService.listarSolicitudesPorUsuario(usuarioId);
    res.status(200).json(solicitudes);
  } catch (err) {
    next(err);
  }
};

// Obtener solicitud por ID
const obtenerSolicitudPorId = async (req, res, next) => {
  try {
    const { id: solicitudId } = req.validatedParams;
    const solicitud = await solicitudService.obtenerSolicitudPorId(solicitudId);
    res.status(200).json(solicitud);
  } catch (err) {
    next(err);
  }
};

// Cancelar solicitud
const cancelarSolicitud = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    const resultado = await solicitudService.cancelarSolicitud(id);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

// Cambiar estado
const cambiarEstadoSolicitud = async (req, res, next) => {
  try {
    const { id: solicitudId } = req.validatedParams;
    const { estadoid, usuarioid } = req.validatedBody;
    const resultado = await solicitudService.cambiarEstadoSolicitud(solicitudId, estadoid, usuarioid);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

// Listar con detalles
const listarSolicitudesConDetalles = async (req, res, next) => {
  try {
    const solicitudes = await solicitudService.listarSolicitudesConDetalles();
    res.status(200).json(solicitudes);
  } catch (err) {
    next(err);
  }
};

// Listar por estado
const listarSolicitudesPorEstado = async (req, res, next) => {
  try {
    const { estadoId } = req.validatedParams;
    const solicitudes = await solicitudService.listarSolicitudesPorEstado(estadoId);
    res.status(200).json(solicitudes);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  crearSolicitud,
  listarSolicitudes,
  listarSolicitudesPorUsuario,
  obtenerSolicitudPorId,
  cancelarSolicitud,
  cambiarEstadoSolicitud,
  listarSolicitudesConDetalles,
  listarSolicitudesPorEstado
};
