const usuarioCultivoService = require('../services/usuarioCultivoService');

const crearAsignacion = async (req,res,next) => {
    try {
        const crear = await usuarioCultivoService.crearAsignacion(req.validatedBody);
        res.status(200).json(crear);        
    } catch (err) {
        next(err);
    }
};

const listarAsignaciones = async (req,res,next) => {
    try {
        const listar = await usuarioCultivoService.listarAsignaciones();
        res.status(200).json(listar);
    } catch (err) {
        next(err);
    }
};

const listarCultivosPorUsuario = async (req,res,next) => {
    try {
        const Cultivos = await usuarioCultivoService.listarCultivosPorUsuario(req.validated.params.usuarioId);
        res.status(200).json(Cultivos);
    } catch (err) {
        next(err);
    } 
};

const obtenerAsignacionPorId = async (req,res,next) => {
    try {
        const obtener = await usuarioCultivoService.obtenerAsignacionPorId(req.validated.params.id);
        res.status(200).json(obtener);
    } catch (err) {
        next(err);
    }
    
};

const actualizarAsignacion = async (req, res, next) => {
  try {
    const actualizar = await usuarioCultivoService.actualizarAsignacion(req.validated.params.id, req.validatedBody);
    res.status(200).json(actualizar);
  } catch (err) {
    next(err);
  }
};

const eliminarAsignacion = async (req,res,next) => {
    try {
        const eliminar = await usuarioCultivoService.eliminarAsignacion(req.validated.params.id);
        res.status(201).json(eliminar)
    } catch (err) {
        next(err);
    }
};

const buscarPorCultivo = async (req, res, next) => {
  try {
    const buscarCultivo = await usuarioCultivoService.buscarPorCultivo(req.validated.params.cultivoId);
    res.status(200).json(buscarCultivo);
  } catch (err) {
    next(err);
  }
};

const buscarPorUbicacion = async (req, res, next) => {
  try {
    const { latitud, longitud } = req.query;
    const buscarUbicacion = await usuarioCultivoService.buscarPorUbicacion(latitud, longitud);
    res.status(200).json(buscarUbicacion);
  } catch (err) {
    next(err);
  }
};

const listarConHistorial = async (req, res, next) => {
  try {
    const listarHistorial = await usuarioCultivoService.listarConHistorial(req.validated.params.usuarioId);
    res.status(200).json(listarHistorial);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  crearAsignacion,
  listarAsignaciones,
  listarCultivosPorUsuario,
  obtenerAsignacionPorId,
  actualizarAsignacion,
  eliminarAsignacion,
  buscarPorCultivo,
  buscarPorUbicacion,
  listarConHistorial
}