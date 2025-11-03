const { SolicitudDetalle } = require('../models/solicitudDetalleModel');
const { Insumo } = require('../models/insumoModel');
const { Solicitud } = require('../models/solicitudModel');

async function agregarDetalle(solicitudId, insumoId, cantidad, precioUnitario) {
  try {
    if (!solicitudId || !insumoId || !cantidad || !precioUnitario) {
      throw new Error('Todos los campos son obligatorios');
    }
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
    if (!solicitudId) throw new Error('solicitudId es obligatorio');
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
    if (!detalleId) throw new Error('detalleId es obligatorio');
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
    if (!detalleId || !nuevaCantidad) throw new Error('detalleId y nuevaCantidad son obligatorios');
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
    if (!detalleId || !nuevoPrecio) throw new Error('detalleId y nuevoPrecio son obligatorios');
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
    if (!detalleId) throw new Error('detalleId es obligatorio');
    const eliminados = await SolicitudDetalle.destroy({ where: { solicituddetalleid: detalleId } });
    if (eliminados === 0) throw new Error('Detalle no encontrado');
    return { mensaje: 'Detalle eliminado exitosamente' };
  } catch (error) {
    console.error('Error al eliminar detalle:', error.message);
    throw new Error('No se pudo eliminar el detalle');
  }
}

module.exports = {
  agregarDetalle,
  listarDetallesPorSolicitud,
  obtenerDetallePorId,
  actualizarCantidad,
  actualizarPrecio,
  eliminarDetalle
};