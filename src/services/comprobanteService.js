// src/services/comprobanteService.js
const { ComprobanteEntrega } = require('../models/comprobanteEntregaModel');

async function registrarComprobante(dto) {
  try {
    dto.validate();
    return await ComprobanteEntrega.create({
      solicitudid: dto.solicitudid,
      fecha_entrega: dto.fecha_entrega,
      entregado_por: dto.entregado_por,
      recibido_por: dto.recibido_por,
      observaciones: dto.observaciones
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