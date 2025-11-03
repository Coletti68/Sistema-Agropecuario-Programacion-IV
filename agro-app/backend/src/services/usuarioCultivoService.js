const { UsuarioCultivo } = require('../models/usuarioCultivoModel');
const { Usuario } = require('../models/usuarioModel');
const { Cultivo } = require('../models/cultivoModel');
const { HistorialCultivo } = require('../models/historialCultivoModel');

async function crearAsignacion(dto) {
  try {
    return await usuariocultivo.create(dto);
  } catch (error) {
    console.error('Error al crear asignación:', error.message);
    throw new Error('No se pudo crear la asignación');
  }
}

async function listarAsignaciones() {
  try {
    return await usuariocultivo.findAll({
      include: [
        { model: usuario, attributes: ['nombre', 'email'] },
        { model: cultivo, attributes: ['nombre'] }
      ]
    });
  } catch (error) {
    throw new Error('No se pudo obtener la lista de asignaciones');
  }
}

async function listarCultivosPorUsuario(usuarioId) {
  try {
    return await usuariocultivo.findAll({
      where: { usuarioid: usuarioId },
      include: [{ model: cultivo, attributes: ['nombre', 'descripcion'] }]
    });
  } catch (error) {
    throw new Error('Error al listar cultivos por usuario');
  }
}

async function obtenerAsignacionPorId(id) {
  try {
    const asignacion = await usuariocultivo.findByPk(id, {
      include: [
        { model: usuario, attributes: ['nombre'] },
        { model: cultivo, attributes: ['nombre'] }
      ]
    });
    if (!asignacion) throw new Error('Asignación no encontrada');
    return asignacion;
  } catch (error) {
    throw new Error('Error al obtener asignación');
  }
}

async function actualizarAsignacion(id, data) {
  try {
    const [actualizados] = await usuariocultivo.update(data, { where: { usuariocultivoid: id } });
    if (actualizados === 0) throw new Error('Asignación no encontrada o sin cambios');
    return { mensaje: 'Asignación actualizada exitosamente' };
  } catch (error) {
    throw new Error('Error al actualizar asignación');
  }
}

async function eliminarAsignacion(id) {
  try {
    const eliminados = await usuariocultivo.destroy({ where: { usuariocultivoid: id } });
    if (eliminados === 0) throw new Error('Asignación no encontrada');
    return { mensaje: 'Asignación eliminada exitosamente' };
  } catch (error) {
    throw new Error('Error al eliminar asignación');
  }
}

async function buscarPorCultivo(cultivoId) {
  try {
    return await usuariocultivo.findAll({
      where: { cultivoid: cultivoId },
      include: [{ model: usuario, attributes: ['nombre', 'email'] }]
    });
  } catch (error) {
    throw new Error('Error al buscar asignaciones por cultivo');
  }
}

async function buscarPorUbicacion(latitud, longitud) {
  try {
    return await usuariocultivo.findAll({
      where: { latitud, longitud }
    });
  } catch (error) {
    throw new Error('Error al buscar por ubicación');
  }
}

async function listarConHistorial(usuarioId) {
  try {
    return await usuariocultivo.findAll({
      where: { usuarioid: usuarioId },
      include: [
        { model: cultivo, attributes: ['nombre'] },
        { model: historialcultivo }
      ]
    });
  } catch (error) {
    throw new Error('Error al listar asignaciones con historial');
  }
}

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
};