const UsuarioCultivo = require('../models/usuarioCultivoModel');
const Usuario = require('../models/usuarioModel');
const Cultivo = require('../models/cultivoModel');
const HistorialCultivo = require('../models/historialCultivoModel');

// -----------------------------
// Crear asignación
// -----------------------------
async function crearAsignacion(data) {
  try {
    if (!data || typeof data !== 'object') throw new Error('Datos de asignación inválidos');
    return await UsuarioCultivo.create(data);
  } catch (error) {
    console.error('Error al crear asignación:', error.message);
    throw new Error('No se pudo crear la asignación');
  }
}

// -----------------------------
// Listar todas las asignaciones
// -----------------------------
async function listarAsignaciones() {
  try {
    return await UsuarioCultivo.findAll({
      include: [
        { model: Usuario, attributes: ['nombre', 'email'] },
        { model: Cultivo, attributes: ['nombre'] }
      ]
    });
  } catch (error) {
    console.error('Error al listar asignaciones:', error.message);
    throw new Error('No se pudo obtener la lista de asignaciones');
  }
}

// -----------------------------
// Listar cultivos por usuario
// -----------------------------
async function listarCultivosPorUsuario(usuarioId) {
  try {
    if (!usuarioId) throw new Error('usuarioId es obligatorio');
    return await UsuarioCultivo.findAll({
      where: { usuarioid: usuarioId },
      include: [{ model: Cultivo, attributes: ['nombre', 'descripcion'] }]
    });
  } catch (error) {
    console.error('Error al listar cultivos por usuario:', error.message);
    throw new Error('No se pudo listar cultivos por usuario');
  }
}

// -----------------------------
// NUEVO: buscar por usuario (para el controller)
// -----------------------------
async function buscarPorUsuario(usuarioId) {
  return listarCultivosPorUsuario(usuarioId);
}

// -----------------------------
// NUEVO: buscar por cultivo
// -----------------------------
async function buscarPorCultivo(cultivoId) {
  try {
    return await UsuarioCultivo.findAll({
      where: { cultivoid: cultivoId },
      include: [{ model: Usuario, attributes: ['nombre', 'email'] }]
    });
  } catch (error) {
    console.error('Error al buscar por cultivo:', error.message);
    throw new Error('No se pudo buscar por cultivo');
  }
}

// -----------------------------
// Obtener asignación por ID
// -----------------------------
async function obtenerAsignacionPorId(id) {
  try {
    if (!id) throw new Error('ID de asignación inválido');
    const asignacion = await UsuarioCultivo.findByPk(id, {
      include: [
        { model: Usuario, attributes: ['nombre'] },
        { model: Cultivo, attributes: ['nombre'] }
      ]
    });
    if (!asignacion) throw new Error('Asignación no encontrada');
    return asignacion;
  } catch (error) {
    console.error('Error al obtener asignación:', error.message);
    throw new Error('No se pudo obtener la asignación');
  }
}

// -----------------------------
// Actualizar asignación
// -----------------------------
async function actualizarAsignacion(id, data) {
  try {
    if (!id || !data) throw new Error('ID y datos requeridos para actualizar');
    const [actualizados] = await UsuarioCultivo.update(data, { where: { usuariocultivoid: id } });
    if (actualizados === 0) throw new Error('Asignación no encontrada o sin cambios');
    return { mensaje: 'Asignación actualizada exitosamente' };
  } catch (error) {
    console.error('Error al actualizar asignación:', error.message);
    throw new Error('No se pudo actualizar la asignación');
  }
}

// -----------------------------
// NUEVO: editar asignación como tu controller lo espera
// -----------------------------
async function editarAsignacionDelUsuario(usuariocultivoId, data) {
  return actualizarAsignacion(usuariocultivoId, data);
}

// -----------------------------
// Eliminar asignación
// -----------------------------
async function eliminarAsignacion(id) {
  try {
    if (!id) throw new Error('ID de asignación inválido');
    const eliminados = await UsuarioCultivo.destroy({ where: { usuariocultivoid: id } });
    if (eliminados === 0) throw new Error('Asignación no encontrada');
    return { mensaje: 'Asignación eliminada exitosamente' };
  } catch (error) {
    console.error('Error al eliminar asignación:', error.message);
    throw new Error('No se pudo eliminar la asignación');
  }
}

// -----------------------------
// Listar con historial
// -----------------------------
async function listarConHistorial(usuarioId) {
  try {
    if (!usuarioId) throw new Error('usuarioId es obligatorio');
    return await UsuarioCultivo.findAll({
      where: { usuarioid: usuarioId },
      include: [
        { model: Cultivo, attributes: ['nombre'] },
        { model: HistorialCultivo }
      ]
    });
  } catch (error) {
    console.error('Error al listar asignaciones con historial:', error.message);
    throw new Error('No se pudo listar asignaciones con historial');
  }
}

// -----------------------------
// NUEVO: para controller obtenerHistorialUsuario
// -----------------------------
async function obtenerHistorialUsuario(usuarioId) {
  return listarConHistorial(usuarioId);
}

// -----------------------------
// NUEVO: buscar por ubicación (dummy, si no tienes lat/lng)
// -----------------------------
async function buscarPorUbicacion(latitud, longitud) {
  try {
    return await UsuarioCultivo.findAll({
      where: { latitud, longitud }
    });
  } catch (error) {
    console.error('Error al buscar por ubicación:', error.message);
    throw new Error('No se pudo buscar por ubicación');
  }
}

module.exports = {
  crearAsignacion,
  listarAsignaciones,
  listarCultivosPorUsuario,
  buscarPorUsuario,
  buscarPorCultivo,
  obtenerAsignacionPorId,
  actualizarAsignacion,
  editarAsignacionDelUsuario,
  eliminarAsignacion,
  listarConHistorial,
  obtenerHistorialUsuario,
  buscarPorUbicacion
};
