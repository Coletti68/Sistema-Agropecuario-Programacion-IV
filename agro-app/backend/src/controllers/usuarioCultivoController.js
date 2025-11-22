const usuarioCultivoService = require('../services/usuarioCultivoService');

// ======================================================
// Crear asignación
// ======================================================
async function crearAsignacion(req, res, next) {
  try {
    const data = req.validatedBody;
    const asignacion = await usuarioCultivoService.crearAsignacion(data);
    res.status(201).json(asignacion);
  } catch (error) {
    next(error);
  }
}

// ======================================================
// Listar todas las asignaciones
// ======================================================
async function listarAsignaciones(req, res, next) {
  try {
    const asignaciones = await usuarioCultivoService.listarAsignaciones();
    res.json(asignaciones);
  } catch (error) {
    next(error);
  }
}

// ======================================================
// Obtener asignación por ID
// ======================================================
async function obtenerAsignacionPorId(req, res, next) {
  try {
    const id = req.validatedParams.usuariocultivoId;
    const asignacion = await usuarioCultivoService.obtenerAsignacionPorId(id);
    res.json(asignacion);
  } catch (error) {
    next(error);
  }
}

// ======================================================
// Listar cultivos por usuario
// ======================================================
async function listarCultivosPorUsuario(req, res, next) {
  try {
    const id = req.validatedParams.id;
    const cultivos = await usuarioCultivoService.buscarPorUsuario(id);
    res.json(cultivos);
  } catch (error) {
    next(error);
  }
}

// ======================================================
// Buscar asignaciones por cultivo
// ======================================================
async function buscarPorCultivo(req, res, next) {
  try {
    const cultivoId = req.validatedParams.cultivoId;
    const asignaciones = await usuarioCultivoService.buscarPorCultivo(cultivoId);
    res.json(asignaciones);
  } catch (error) {
    next(error);
  }
}

// ======================================================
// Buscar por ubicación
// ======================================================
async function buscarPorUbicacion(req, res, next) {
  try {
    const { latitud, longitud } = req.query; // VALIDATED POR TU MIDDLEWARE
    const resultados = await usuarioCultivoService.buscarPorUbicacion(latitud, longitud);
    res.json(resultados);
  } catch (error) {
    next(error);
  }
}

// ======================================================
// Actualizar asignación
// ======================================================
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

// ======================================================
// Editar asignación del usuario (/mis-cultivos/:id)
// ======================================================
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

// ======================================================
// Eliminar asignación
// ======================================================
async function eliminarAsignacion(req, res, next) {
  try {
    const id = req.validatedParams.usuariocultivoId;

    const result = await usuarioCultivoService.eliminarAsignacion(id);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

// ======================================================
// Desactivar asignación (mis-cultivos)
// ======================================================
async function desactivarAsignacionDelUsuario(req, res, next) {
  try {
    const id = req.validatedParams.usuariocultivoId;

    const result = await usuarioCultivoService.desactivarAsignacionDelUsuario(id);

    res.json(result);
  } catch (error) {
    next(error);
  }
}

// ======================================================
// Obtener historial
// ======================================================
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
};
