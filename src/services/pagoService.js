// src/services/pagoService.js
const { Pago } = require('../models/pagoModel');

async function registrarPago(dto) {
  try {
    dto.validate();
    return await Pago.create({
      solicitudid: dto.solicitudid,
      metodo: dto.metodo,
      monto: dto.monto,
      fecha_pago: dto.fecha_pago,
      confirmado: dto.confirmado
    });
  } catch (error) {
    console.error("Error al registrar pago:", error.message);
    throw new Error("No se pudo registrar el pago");
  }
}

async function obtenerPagosPorSolicitud(solicitudid) {
  try {
    return await Pago.findAll({ where: { solicitudid } });
  } catch (error) {
    console.error("Error al obtener pagos:", error.message);
    throw new Error("No se pudieron obtener los pagos");
  }
}

module.exports = {
  registrarPago,
  obtenerPagosPorSolicitud
};