const SolicitudDetalle = require('../models/solicitudDetalleModel');
const Solicitud = require('../models/solicitudModel');
const Insumo = require('../models/insumoModel');



async function agregarDetalle(solicitudId, insumoId, cantidad, precioUnitario) {
  try {
    return await SolicitudDetalle.create({
      solicitudid: solicitudId,
      insumoid: insumoId,
      cantidad,
      preciounitario: precioUnitario
    });
  } catch (error) {
    console.error('Error al agregar detalle:', error.message);
    throw new Error('No se pudo agregar el detalle a la solicitud');
  }
}

async function listarDetallesPorSolicitud(solicitudId) {
  try {
    return await SolicitudDetalle.findAll({
      where: { solicitudid: solicitudId },
      include: [{ model: Insumo, attributes: ['nombre', 'descripcion', 'precio'] }]
    });
  } catch (error) {
    console.error('Error al listar detalles:', error.message);
    throw new Error('No se pudo listar los detalles de la solicitud');
  }
}

async function obtenerDetallePorId(detalleId) {
  try {
    const detalle = await SolicitudDetalle.findByPk(detalleId, {
      include: [{ model: Insumo, attributes: ['nombre'] }]
    });
    if (!detalle) throw new Error('Detalle no encontrado');
    return detalle;
  } catch (error) {
    console.error('Error al obtener detalle:', error.message);
    throw new Error('No se pudo obtener el detalle');
  }
}

async function actualizarCantidad(detalleId, nuevaCantidad) {
  try {
  
    const [actualizados] = await SolicitudDetalle.update(
      { cantidad: nuevaCantidad },
      { where: { solicituddetalleid: detalleId } }
    );
    if (actualizados === 0) throw new Error('Detalle no encontrado o sin cambios');
    return { mensaje: 'Cantidad actualizada exitosamente' };
  } catch (error) {
    console.error('Error al actualizar cantidad:', error.message);
    throw new Error('No se pudo actualizar la cantidad');
  }
}

async function actualizarPrecio(detalleId, nuevoPrecio) {
  try {
    const [actualizados] = await SolicitudDetalle.update(
      { preciounitario: nuevoPrecio },
      { where: { solicituddetalleid: detalleId } }
    );
    if (actualizados === 0) throw new Error('Detalle no encontrado o sin cambios');
    return { mensaje: 'Precio actualizado exitosamente' };
  } catch (error) {
    console.error('Error al actualizar precio:', error.message);
    throw new Error('No se pudo actualizar el precio');
  }
}

async function eliminarDetalle(detalleId) {
  try {
    const eliminados = await SolicitudDetalle.destroy({ where: { solicituddetalleid: detalleId } });
    if (eliminados === 0) throw new Error('Detalle no encontrado');
    return { mensaje: 'Detalle eliminado exitosamente' };
  } catch (error) {
    console.error('Error al eliminar detalle:', error.message);
    throw new Error('No se pudo eliminar el detalle');
  }
}

async function editarDetalle(detalleId, data) {
  try {
    const detalle = await SolicitudDetalle.findByPk(detalleId);
    if (!detalle) throw new Error('Detalle no encontrado');

    await detalle.update({
      cantidad: data.cantidad,
      preciounitario: data.preciounitario
    });

    return detalle;
  } catch (error) {
    console.error('Error al editar detalle:', error.message);
    throw new Error('No se pudo editar el detalle');
  }
}
module.exports = {
  agregarDetalle,
  listarDetallesPorSolicitud,
  obtenerDetallePorId,
  actualizarCantidad,
  actualizarPrecio,
  eliminarDetalle,
  editarDetalle
};