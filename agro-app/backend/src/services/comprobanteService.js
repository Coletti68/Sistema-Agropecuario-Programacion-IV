// src/services/comprobanteService.js
const { ComprobanteEntrega } = require('../models/comprobanteEntregaModel');

async function registrarComprobante(data) {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Datos de comprobante inválidos');
    }

    return await ComprobanteEntrega.create({
      solicitudid: data.solicitudid,
      fecha_entrega: data.fecha_entrega,
      entregado_por: data.entregado_por,
      recibido_por: data.recibido_por,
      observaciones: data.observaciones
    });

  } catch (error) {
    console.error("Error al registrar comprobante:", error.message);
    throw new Error("No se pudo registrar el comprobante");
  }
}

async function obtenerComprobantesPorSolicitud(solicitudid) {
  try {
    return await ComprobanteEntrega.findAll({ where: { solicitudid } });
  } catch (error) {
    console.error("Error al obtener comprobantes:", error.message);
    throw new Error("No se pudieron obtener los comprobantes");
  }
}

module.exports = {
  registrarComprobante,
  obtenerComprobantesPorSolicitud
};