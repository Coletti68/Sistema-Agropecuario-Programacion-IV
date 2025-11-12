// src/services/pagoService.js
const { Pago } = require('../models/pagoModel');

async function registrarPago(data) {
  try {
    if(!data || typeof data !== 'object'){
      throw new Error('Datos de proveedor invalidos');
    }
    return await Pago.create({
      solicitudid: data.solicitudid,
      metodo: data.metodo,
      monto: data.monto,
      fecha_pago: data.fecha_pago,
      confirmado: data.confirmado
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