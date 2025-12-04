const Pago = require('../models/pagoModel');
const Usuario = require('../models/usuarioModel');

async function registrarPago(data) {
  try {
    return await Pago.create({
      solicitudid: data.solicitudid,
      usuarioid: data.usuarioid,
      monto: data.monto,
      metodo_pago: data.metodo_pago,
      observaciones: data.observaciones
    });
  } catch (error) {
    console.error("Error al registrar pago:", error);
    throw new Error("No se pudo registrar el pago");
  }
}

async function listarPagos() {
  return await Pago.findAll({ include: Usuario });
}

async function listarPagosPorUsuario(usuarioid) {
  return await Pago.findAll({ where: { usuarioid } });
}

async function obtenerPagosPorSolicitud(solicitudid) {
  return await Pago.findAll({ where: { solicitudid } });
}

async function actualizarEstadoPago(pagoId, estado_pago) {
  const pago = await Pago.findByPk(pagoId);
  if (!pago) throw new Error("Pago no encontrado");

  await pago.update({ estado_pago });
  
  return { mensaje: "Estado actualizado correctamente" };
}

module.exports = {
  registrarPago,
  listarPagos,
  listarPagosPorUsuario,
  obtenerPagosPorSolicitud,
  actualizarEstadoPago
};
