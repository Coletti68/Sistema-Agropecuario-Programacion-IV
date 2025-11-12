const { HistorialEstadoSolicitud } = require('../models/historialEstadoSolicitudModel');
const { Usuario } = require('../models/usuarioModel');
const { EstadoSolicitud } = require('../models/estadoSolicitudModel');
const { Solicitud } = require('../models/solicitudModel');

async function registrarCambioEstado(solicitudId, estadoId, usuarioId) {
  try {
    return await HistorialEstadoSolicitud.create({
      solicitudid: solicitudId,
      estadosolicitudid: estadoId,
      usuarioid: usuarioId
    });
  } catch (error) {
    console.error('Error al registrar cambio de estado:', error.message);
    throw new Error('No se pudo registrar el cambio de estado');
  }
}

async function listarHistorial() {
  try {
    return await HistorialEstadoSolicitud.findAll({
      include: [
        { model: Solicitud, attributes: ['solicitudid'] },
        { model: EstadoSolicitud, attributes: ['nombre'] },
        { model: Usuario, attributes: ['nombre', 'email'] }
      ]
    });
  } catch (error) {
    console.error('Error al listar historial:', error.message);
    throw new Error('No se pudo obtener el historial');
  }
}

async function obtenerPorId(historialId) {
  try {
    const registro = await HistorialEstadoSolicitud.findByPk(historialId, {
      include: [
        { model: Solicitud, attributes: ['solicitudid'] },
        { model: EstadoSolicitud, attributes: ['nombre'] },
        { model: Usuario, attributes: ['nombre'] }
      ]
    });
    if (!registro) throw new Error('Registro no encontrado');
    return registro;
  } catch (error) {
    console.error('Error al obtener registro:', error.message);
    throw new Error('No se pudo obtener el registro');
  }
}

async function listarPorSolicitud(solicitudId) {
  try {
    return await HistorialEstadoSolicitud.findAll({
      where: { solicitudid: solicitudId },
      include: [
        { model: EstadoSolicitud, attributes: ['nombre'] },
        { model: Usuario, attributes: ['nombre'] }
      ]
    });
  } catch (error) {
    console.error('Error al listar historial por solicitud:', error.message);
    throw new Error('No se pudo listar historial por solicitud');
  }
}

async function listarPorUsuario(usuarioId) {
  try {
    if (!usuarioId) throw new Error('usuarioId es obligatorio');
    return await HistorialEstadoSolicitud.findAll({
      where: { usuarioid: usuarioId },
      include: [
        { model: Solicitud, attributes: ['solicitudid'] },
        { model: EstadoSolicitud, attributes: ['nombre'] }
      ]
    });
  } catch (error) {
    console.error('Error al listar historial por usuario:', error.message);
    throw new Error('No se pudo listar historial por usuario');
  }
}

async function listarConDetalles(solicitudId) {
  try {
    if (!solicitudId) throw new Error('solicitudId es obligatorio');
    return await HistorialEstadoSolicitud.findAll({
      where: { solicitudid: solicitudId },
      include: [
        { model: Solicitud, attributes: ['solicitudid'] },
        { model: EstadoSolicitud, attributes: ['nombre'] },
        { model: Usuario, attributes: ['nombre', 'email'] }
      ]
    });
  } catch (error) {
    console.error('Error al listar historial con detalles:', error.message);
    throw new Error('No se pudo listar historial con detalles');
  }
}

module.exports = {
  registrarCambioEstado,
  listarHistorial,
  obtenerPorId,
  listarPorSolicitud,
  listarPorUsuario,
  listarConDetalles
};