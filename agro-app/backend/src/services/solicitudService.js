const { db: sequelize } = require('../models'); // Asegúrate de importar sequelize
const {
  Solicitud,
  Usuario,
  EstadoSolicitud,
  HistorialEstadoSolicitud,
  SolicitudDetalle,
  Insumo
} = require('../models');

async function crearSolicitud(usuarioId, detalle) {
  try {
    if (!usuarioId) throw new Error('usuarioId es obligatorio');
    if (!detalle || !Array.isArray(detalle) || detalle.length === 0) {
      throw new Error('El detalle es obligatorio');
    }

    return await sequelize.transaction(async (t) => {
   
      const solicitud = await Solicitud.create(
        { usuarioid: usuarioId },
        { transaction: t }
      );

 
      for (const item of detalle) {
        await SolicitudDetalle.create(
          {
            solicitudid: solicitud.solicitudid,
            insumoid: item.insumoid,
            cantidad: item.cantidad,
            preciounitario: item.preciounitario
          },
          { transaction: t }
        );
      }

      return solicitud;
    });

  } catch (error) {
    console.error('Error al crear solicitud:', error.message);
    throw new Error('No se pudo crear la solicitud');
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
          as: 'SolicitudDetalles',
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
    await Solicitud.update(
      { estadosolicitudid: estadoId },
      { where: { solicitudid: solicitudId } }
    );
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
          as: 'SolicitudDetalles',
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

async function listarSolicitudes() {
  try {
    return await Solicitud.findAll();
  } catch (error) {
    console.error('Error al listar solicitudes:', error.message);
    throw new Error('No se pudieron listar las solicitudes');
  }
}

async function listarSolicitudesPorUsuario(usuarioId) {
  try {
    return await Solicitud.findAll({ where: { usuarioid: usuarioId } });
  } catch (error) {
    console.error('Error al listar solicitudes por usuario:', error.message);
    throw new Error('No se pudieron listar las solicitudes del usuario');
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
