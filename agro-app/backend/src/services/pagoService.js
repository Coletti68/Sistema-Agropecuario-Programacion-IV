const { Pago } = require('../models/pagoModel');
const { Usuario } = require('../models/usuarioModel');

//  Registrar pago
async function registrarPago(data) {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Datos de pago inválidos');
    }

    return await Pago.create({
      solicitudid: data.solicitudid,
      metodo: data.metodo,
      monto: data.monto,
      fecha_pago: data.fecha_pago,
      confirmado: data.confirmado
    });
  } catch (error) {
    console.error('Error al registrar pago:', error.message);
    throw new Error('No se pudo registrar el pago');
  }
}

//  Listar todos los pagos (admin)
async function listarPagos() {
  try {
    return await Pago.findAll({
      include: [{ model: Usuario, attributes: ['nombre', 'email'] }]
    });
  } catch (error) {
    console.error('Error al listar pagos:', error.message);
    throw new Error('No se pudo obtener la lista de pagos');
  }
}

//  Ver pagos propios (productor)
async function listarPagosPorUsuario(usuarioid) {
  try {
    return await Pago.findAll({
      include: [
        {
          model: Usuario,
          attributes: ['nombre'],
          where: { usuarioid }
        }
      ]
    });
  } catch (error) {
    console.error('Error al listar pagos por usuario:', error.message);
    throw new Error('No se pudieron obtener los pagos del usuario');
  }
}

//  Actualizar estado de pago (admin)
async function actualizarEstadoPago(pagoId, confirmado) {
  try {
    const pago = await Pago.findByPk(pagoId);
    if (!pago) throw new Error('Pago no encontrado');

    await pago.update({ confirmado });
    return { mensaje: 'Estado de pago actualizado exitosamente' };
  } catch (error) {
    console.error('Error al actualizar estado de pago:', error.message);
    throw new Error('No se pudo actualizar el estado del pago');
  }
}

//  Obtener pagos por solicitud
async function obtenerPagosPorSolicitud(solicitudid) {
  try {
    return await Pago.findAll({ where: { solicitudid } });
  } catch (error) {
    console.error('Error al obtener pagos:', error.message);
    throw new Error('No se pudieron obtener los pagos');
  }
}

module.exports = {
  registrarPago,
  listarPagos,
  listarPagosPorUsuario,
  actualizarEstadoPago,
  obtenerPagosPorSolicitud
};