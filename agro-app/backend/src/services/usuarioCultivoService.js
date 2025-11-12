const { UsuarioCultivo } = require('../models/usuarioCultivoModel');
const { Usuario } = require('../models/usuarioModel');
const { Cultivo } = require('../models/cultivoModel');
const { HistorialCultivo } = require('../models/historialCultivoModel');

async function crearAsignacion(data) {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Datos de asignación inválidos');
    }

    return await UsuarioCultivo.create(data);
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
    console.error('Error al listar asignaciones:', error.message);
    throw new Error('No se pudo obtener la lista de asignaciones');
  }
}

async function listarCultivosPorUsuario(usuarioId) {
  try {
    if (!usuarioId) throw new Error('usuarioId es obligatorio');

    return await usuariocultivo.findAll({
      where: { usuarioid: usuarioId },
      include: [{ model: cultivo, attributes: ['nombre', 'descripcion'] }]
    });
  } catch (error) {
    console.error('Error al listar cultivos por usuario:', error.message);
    throw new Error('No se pudo listar cultivos por usuario');

  }
}

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


async function actualizarAsignacion(id, data) {
  try {
    if (!id || !data) throw new Error('ID y datos requeridos para actualizar');

    const [actualizados] = await usuariocultivo.update(data, { where: { usuariocultivoid: id } });
    if (actualizados === 0) throw new Error('Asignación no encontrada o sin cambios');
    return { mensaje: 'Asignación actualizada exitosamente' };
  } catch (error) {
    console.error('Error al actualizar asignacion:',error.message);
    throw new Error('Error al actualizar asignación');
  }
}

async function eliminarAsignacion(id) {
  try {
    if (!id) throw new Error('ID de asignación inválido');

    const eliminados = await usuariocultivo.destroy({ where: { usuariocultivoid: id } });
    if (eliminados === 0) throw new Error('Asignación no encontrada');
    return { mensaje: 'Asignación eliminada exitosamente' };
  } catch (error) {
    console.error('Error al eliminar asignación:', error.message);
    throw new Error('Error al eliminar asignación');
  }
}

async function buscarPorCultivo(cultivoId) {
  try {
    if (!cultivoId) throw new Error('cultivoId es obligatorio');

    return await usuariocultivo.findAll({
      where: { cultivoid: cultivoId },
      include: [{ model: usuario, attributes: ['nombre', 'email'] }]
    });
  } catch (error) {
    console.error('Error al buscar asignaciones por cultivo:', error.message);

    throw new Error('No se pudo buscar asignaciones por cultivo');
  }
}

async function buscarPorUbicacion(latitud, longitud) {
  try {
    if (latitud == null || longitud == null){
      throw new Error('Latitud y longitud son obligatorios ');

    }
    return await usuariocultivo.findAll({
      where: { latitud, longitud }
    });
  } catch (error) {
    console.error('Errorr al buscar por ubicacion',error.message);
    throw new Error('No se pudo por ubicación');
  }
}

async function listarConHistorial(usuarioId) {
  try {
    if(!usuarioId) throw new Error("UsuarioId es obligatorio");

    return await usuariocultivo.findAll({
      where: { usuarioid: usuarioId },
      include: [
        { model: cultivo, attributes: ['nombre'] },
        { model: historialcultivo }
      ]
    });
  } catch (error) {
    console.error('Error al listar asignaciones con historial:', error.message);
    throw new Error('No se pudo listar asignaciones con historial');

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