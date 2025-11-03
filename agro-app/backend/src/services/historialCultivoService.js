const { HistorialCultivo } = require('../models/historialCultivoModel');
const { Usuario } = require('../models/usuarioModel');
const { UsuarioCultivo } = require('../models/usuarioCultivoModel');
const { Cultivo } = require('../models/cultivoModel');

async function registrarCambio(dto) {
  try {
    if (!dto.usuariocultivoid || !dto.usuarioid || !dto.latitud || !dto.longitud) {
      throw new Error('Campos obligatorios: usuariocultivoid, usuarioid, latitud, longitud');
    }
    return await historialcultivo.create(dto);
  } catch (error) {
    console.error('Error al registrar cambio:', error.message);
    throw new Error('No se pudo registrar el cambio en el historial');
  }
}

async function listarHistorial() {
  try {
    return await historialcultivo.findAll({
      include: [
        { model: usuario, attributes: ['nombre', 'email'] },
        { model: usuariocultivo, include: [{ model: cultivo, attributes: ['nombre'] }] }
      ]
    });
  } catch (error) {
    console.error('Error al listar historial:', error.message);
    throw new Error('No se pudo obtener el historial');
  }
}

async function obtenerPorId(historialId) {
  try {
    if (!historialId) throw new Error('historialId es obligatorio');
    const registro = await historialcultivo.findByPk(historialId, {
      include: [
        { model: usuario, attributes: ['nombre'] },
        { model: usuariocultivo, include: [{ model: cultivo, attributes: ['nombre'] }] }
      ]
    });
    if (!registro) throw new Error('Registro no encontrado');
    return registro;
  } catch (error) {
    console.error('Error al obtener registro:', error.message);
    throw new Error('No se pudo obtener el registro');
  }
}

async function eliminarRegistro(historialId) {
  try {
    if (!historialId) throw new Error('historialId es obligatorio');
    const eliminados = await historialcultivo.destroy({ where: { historialid: historialId } });
    if (eliminados === 0) throw new Error('Registro no encontrado');
    return { mensaje: 'Registro eliminado exitosamente' };
  } catch (error) {
    console.error('Error al eliminar registro:', error.message);
    throw new Error('No se pudo eliminar el registro');
  }
}

async function listarPorUsuario(usuarioId) {
  try {
    if (!usuarioId) throw new Error('usuarioId es obligatorio');
    return await historialcultivo.findAll({
      where: { usuarioid: usuarioId },
      include: [{ model: usuariocultivo, include: [{ model: cultivo, attributes: ['nombre'] }] }]
    });
  } catch (error) {
    console.error('Error al listar historial por usuario:', error.message);
    throw new Error('No se pudo listar historial por usuario');
  }
}

async function listarPorAsignacion(usuariocultivoId) {
  try {
    if (!usuariocultivoId) throw new Error('usuariocultivoId es obligatorio');
    return await historialcultivo.findAll({
      where: { usuariocultivoid: usuariocultivoId },
      include: [{ model: usuario, attributes: ['nombre'] }]
    });
  } catch (error) {
    console.error('Error al listar historial por asignación:', error.message);
    throw new Error('No se pudo listar historial por asignación');
  }
}

async function listarConDetalles(usuariocultivoId) {
  try {
    if (!usuariocultivoId) throw new Error('usuariocultivoId es obligatorio');
    return await historialcultivo.findAll({
      where: { usuariocultivoid: usuariocultivoId },
      include: [
        { model: usuario, attributes: ['nombre', 'email'] },
        { model: usuariocultivo, include: [{ model: cultivo, attributes: ['nombre', 'descripcion'] }] }
      ]
    });
  } catch (error) {
    console.error('Error al listar historial con detalles:', error.message);
    throw new Error('No se pudo listar historial con detalles');
  }
}

module.exports = {
  registrarCambio,
  listarHistorial,
  obtenerPorId,
  eliminarRegistro,
  listarPorUsuario,
  listarPorAsignacion,
  listarConDetalles
};