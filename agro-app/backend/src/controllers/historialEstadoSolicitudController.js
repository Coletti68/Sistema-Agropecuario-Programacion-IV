const historialService = require('../services/historialEstadoSolicitudService');

//historial-estado
const registrarCambioEstado = async (req, res, next) => {
  try {
    const { solicitudid, estadosolicitudid, usuarioid } = req.validatedBody;

    const resultado = await historialService.registrarCambioEstado(
      solicitudid,
      estadosolicitudid,
      usuarioid
    );

    res.status(201).json(resultado);
  } catch (err) {
    next(err);
  }
};

//historial-estado
const listarHistorial = async (req, res, next) => {
  try {
    const historial = await historialService.listarHistorial();
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

// historial-estado/:id
const obtenerPorId = async (req, res, next) => {
  try {
    const registro = await historialService.obtenerPorId(req.validated.params.id);
    res.status(200).json(registro);
  } catch (err) {
    next(err);
  }
};

// historial-estado/solicitud/:solicitudId
const listarPorSolicitud = async (req, res, next) => {
  try {
    const historial = await historialService.listarPorSolicitud(
      req.validated.params.solicitudId
    );
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

//historial-estado/usuario/:usuarioId
const listarPorUsuario = async (req, res, next) => {
  try {
    const historial = await historialService.listarPorUsuario(
      req.validated.params.usuarioId
    );
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

//historial-estado/detalles/:solicitudId
const listarConDetalles = async (req, res, next) => {
  try {
    const historial = await historialService.listarConDetalles(
      req.validated.params.solicitudId
    );
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
