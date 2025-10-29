// src/controllers/comprobanteController.js
const ComprobanteCreateDTO = require('../DTOs/comprobante/comprobanteCreateDTO');
const ComprobanteResponseDTO = require('../DTOs/comprobante/comprobanteResponseDTO');
const {
  registrarComprobante,
  obtenerComprobantesPorSolicitud
} = require('../services/comprobanteService');

async function postComprobante(req, res) {
  try {
    const dto = new ComprobanteCreateDTO(req.body);
    const nuevo = await registrarComprobante(dto);
    res.status(201).json(new ComprobanteResponseDTO(nuevo));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getComprobantesPorSolicitud(req, res) {
  try {
    const comprobantes = await obtenerComprobantesPorSolicitud(req.params.solicitudid);
    res.json(comprobantes.map(c => new ComprobanteResponseDTO(c)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  postComprobante,
  getComprobantesPorSolicitud
};