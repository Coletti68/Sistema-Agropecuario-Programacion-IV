const usuarioCultivoService = require('../services/usuarioCultivoService');

async function crearAsignacion(req, res, next) {
  try {
    const data = req.validatedBody;
    console.log('🚀 [crearAsignacion] Datos recibidos en controller:', data);
    const asignacion = await usuarioCultivoService.crearAsignacion(data);
    res.status(201).json(asignacion);
  } catch (error) {
    next(error);
  }
}
async function crearCultivoCompleto(req, res) {
  try {
    const data = req.body;
    const asignacion = await usuarioCultivoService.crearCultivoConAsignacion(data);
    res.status(201).json(asignacion);
  } catch (err) {
    console.error('❌ Error en /cultivo-completo:', err);
    res.status(500).json({ error: 'No se pudo crear el cultivo completo' });
  }
}

async function listarAsignaciones(req, res, next) {
  try {
    const asignaciones = await usuarioCultivoService.listarAsignaciones();
    res.json(asignaciones);
  } catch (error) {
    next(error);
  }
}

async function obtenerAsignacionPorId(req, res, next) {
  try {
    const id = req.validatedParams.usuariocultivoId;
    const asignacion = await usuarioCultivoService.obtenerAsignacionPorId(id);
    res.json(asignacion);
  } catch (error) {
    next(error);
  }
}

async function listarCultivosPorUsuario(req, res, next) {
  try {
    const id = req.validatedParams.id;
    const cultivos = await usuarioCultivoService.buscarPorUsuario(id);
    res.json(cultivos);
  } catch (error) {
    next(error);
  }
}

async function buscarPorCultivo(req, res, next) {
  try {
    const cultivoId = req.validatedParams.cultivoId;
    const asignaciones = await usuarioCultivoService.buscarPorCultivo(cultivoId);
    res.json(asignaciones);
  } catch (error) {
    next(error);
  }
}

async function buscarPorUbicacion(req, res, next) {
  try {
    const { latitud, longitud } = req.query;
    const resultados = await usuarioCultivoService.buscarPorUbicacion(latitud, longitud);
    res.json(resultados);
  } catch (error) {
    next(error);
  }
}

async function actualizarAsignacion(req, res, next) {
  try {
    const id = req.validatedParams.usuariocultivoId;
    const data = req.validatedBody;

    const result = await usuarioCultivoService.actualizarAsignacion(id, data);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function editarAsignacionDelUsuario(req, res, next) {
  try {
    const id = req.validatedParams.usuariocultivoId;
    const data = req.validatedBody;

    const result = await usuarioCultivoService.editarAsignacionDelUsuario(id, data);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function eliminarAsignacion(req, res, next) {
  try {
    const id = req.validatedParams.usuariocultivoId;

    const result = await usuarioCultivoService.eliminarAsignacion(id);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function desactivarAsignacionDelUsuario(req, res, next) {
  try {
    const id = req.validatedParams.usuariocultivoId;

    const result = await usuarioCultivoService.desactivarAsignacionDelUsuario(id);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function listarConHistorial(req, res, next) {
  try {
    const id = req.validatedParams.id;
    const historial = await usuarioCultivoService.obtenerHistorialUsuario(id);
    res.json(historial);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  crearAsignacion,
  listarAsignaciones,
  obtenerAsignacionPorId,
  listarCultivosPorUsuario,
  buscarPorCultivo,
  buscarPorUbicacion,
  actualizarAsignacion,
  editarAsignacionDelUsuario,
  eliminarAsignacion,
  desactivarAsignacionDelUsuario,
  listarConHistorial,
  crearCultivoCompleto
};
