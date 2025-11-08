const solicitudService = require('../services/solicitudService');

const crearSolicitud = async (req,res,next) => {
  try {
    const nuevo = await solicitudService.crearSolicitud(req.parms.usuarioId);
    res.status(200).json(nuevo);
  } catch (err) {
    next(err);
  }
  
};

const listarSolicitudes = async (req,res,next) => {
  try {
    const listar = await solicitudService.listarSolicitudes();
    res.status(200).json(listar);
  } catch (err) {
    next(err);
  }

};

const listarSolicitudesPorUsuario = async (req,res,next) => {
  try {
    const listarSoliUsuario = await solicitudService.listarSolicitudesPorUsuario(req.validated.params.usuarioId);
    res.status(200).json(listarSoliUsuario);
  } catch (err) {
    next(err);
  }
  
};

const obtenerSolicitudesPorId = async (req,res,next) => {
  try {
    const listarSoliId = await solicitudService.obtenerSolicitudPorId(req.validated.params.solicitudId);
    res.status(200).json(listarSoliId);
  } catch (err) {
    next(err);
  }
  
};

const cancelarSolicitud = async (req, res, next) => {
  try {
    const resultado = await solicitudService.cancelarSolicitud(req.validated.params.id);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

const cambiarEstadoSolicitud = async (req, res, next) => {
  try {
    const { estadoid, usuarioid } = req.validatedBody;
    const resultado = await solicitudService.cambiarEstadoSolicitud(req.validated.params.id, estadoid, usuarioid);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

const listarSolicitudesConDetalles = async (req, res, next) => {
  try {
    const solicitudes = await solicitudService.listarSolicitudesConDetalles();
    res.status(200).json(solicitudes);
  } catch (err) {
    next(err);
  }
};

const listarSolicitudesPorEstado = async (req, res, next) => {
  try {
    const solicitudes = await solicitudService.listarSolicitudesPorEstado(req.validated.params.estadoId);
    res.status(200).json(solicitudes);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  crearSolicitud,
  listarSolicitudes,
  listarSolicitudesPorUsuario,
  obtenerSolicitudesPorId,
  cancelarSolicitud,
  cambiarEstadoSolicitud,
  listarSolicitudesConDetalles,
  listarSolicitudesPorEstado
};

