const {
  Solicitud,
  Usuario,
  EstadoSolicitud,
  HistorialEstadoSolicitud,
  SolicitudDetalle,
  Insumo
} = require('../models'); // Importar desde index.js con relaciones definidas

async function crearSolicitud(usuarioId) {
  try {
    if (!usuarioId) throw new Error('usuarioId es obligatorio');
    return await Solicitud.create({ usuarioid: usuarioId });
  } catch (error) {
    console.error('Error al crear solicitud:', error.message);
    throw new Error('No se pudo crear la solicitud');
  }
}

async function listarSolicitudes() {
  try {
    return await Solicitud.findAll({
      include: [
        { model: Usuario, attributes: ['nombre', 'email'] },
        { model: EstadoSolicitud, attributes: ['nombre'] }
      ]
    });
  } catch (error) {
    console.error('Error al listar solicitudes:', error.message);
    throw new Error('No se pudo obtener la lista de solicitudes');
  }
}

async function listarSolicitudesPorUsuario(usuarioId) {
  try {
    return await Solicitud.findAll({
      where: { usuarioid: usuarioId },
      include: [{ model: EstadoSolicitud, attributes: ['nombre'] }]
    });
  } catch (error) {
    console.error('Error al listar solicitudes por usuario:', error.message);
    throw new Error('No se pudo listar solicitudes por usuario');
  }
}

async function obtenerSolicitudPorId(solicitudId) {
  try {
    const solicitud = await Solicitud.findByPk(solicitudId, {
      include: [
        { model: Usuario, attributes: ['nombre'] },
        { model: EstadoSolicitud, attributes: ['nombre'] },
        {
          model: SolicitudDetalle,
          as: 'SolicitudDetalles', // Coincide con alias en asociación
          include: [{ model: Insumo, attributes: ['nombre', 'precio'] }]
        }
      ]
    });
    if (!solicitud) throw new Error('Solicitud no encontrada');
    return solicitud;
  } catch (error) {
    console.error('Error al obtener solicitud:', error.message);
    throw new Error('No se pudo obtener la solicitud');
  }
}

async function cancelarSolicitud(solicitudId) {
  try {
    const [actualizados] = await Solicitud.update(
      { activo: false },
      { where: { solicitudid: solicitudId } }
    );
    if (actualizados === 0) throw new Error('Solicitud no encontrada o ya inactiva');
    return { mensaje: 'Solicitud cancelada exitosamente' };
  } catch (error) {
    console.error('Error al cancelar solicitud:', error.message);
    throw new Error('No se pudo cancelar la solicitud');
  }
}

async function cambiarEstadoSolicitud(solicitudId, estadoId, usuarioId) {
  try {
    await Solicitud.update({ estadosolicitudid: estadoId }, { where: { solicitudid: solicitudId } });
    await HistorialEstadoSolicitud.create({
      solicitudid: solicitudId,
      estadosolicitudid: estadoId,
      usuarioid: usuarioId
    });
    return { mensaje: 'Estado de solicitud actualizado y registrado en historial' };
  } catch (error) {
    console.error('Error al cambiar estado de solicitud:', error.message);
    throw new Error('No se pudo cambiar el estado de la solicitud');
  }
}

async function listarSolicitudesConDetalles() {
  try {
    return await Solicitud.findAll({
      include: [
        { model: Usuario, attributes: ['nombre', 'email'] },
        { model: EstadoSolicitud, attributes: ['nombre'] },
        {
          model: SolicitudDetalle,
          as: 'SolicitudDetalles', // Coincide con alias en asociación
          include: [{ model: Insumo, attributes: ['nombre', 'precio'] }]
        }
      ]
    });
  } catch (error) {
    console.error('Error al listar solicitudes con detalles:', error.message);
    throw new Error('No se pudo listar solicitudes con detalles');
  }
}

async function listarSolicitudesPorEstado(estadoId) {
  try {
    return await Solicitud.findAll({
      where: { estadosolicitudid: estadoId },
      include: [{ model: Usuario, attributes: ['nombre'] }]
    });
  } catch (error) {
    console.error('Error al listar solicitudes por estado:', error.message);
    throw new Error('No se pudo listar solicitudes por estado');
  }
}

module.exports = {
  crearSolicitud,
  listarSolicitudes,
  listarSolicitudesPorUsuario,
  obtenerSolicitudPorId,
  cancelarSolicitud,
  cambiarEstadoSolicitud,
  listarSolicitudesConDetalles,
  listarSolicitudesPorEstado
};
