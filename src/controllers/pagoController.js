// src/controllers/pagoController.js
const PagoCreateDTO = require('../DTOs/pago/pagoCreateDTO');
const PagoResponseDTO = require('../DTOs/pago/pagoResponseDTO');
const {
  registrarPago,
  obtenerPagosPorSolicitud
} = require('../services/pagoService');

async function postPago(req, res) {
  try {
    const dto = new PagoCreateDTO(req.body);
    const nuevo = await registrarPago(dto);
    res.status(201).json(new PagoResponseDTO(nuevo));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getPagosPorSolicitud(req, res) {
  try {
    const pagos = await obtenerPagosPorSolicitud(req.params.solicitudid);
    res.json(pagos.map(p => new PagoResponseDTO(p)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  postPago,
  getPagosPorSolicitud
};