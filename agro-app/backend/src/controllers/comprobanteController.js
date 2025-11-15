const comprobanteService = require('../services/comprobanteService');

// Registrar comprobante
const registrarComprobante = async (req, res, next) => {
  try {
    const nuevo = await comprobanteService.registrarComprobante(req.validatedBody);
    res.status(200).json(nuevo);
  } catch (err) {
    next(err);
  }
};

// Obtener comprobantes por solicitud ID
const obtenerComprobantesPorSolicitud = async (req, res, next) => {
  try {
    const comprobantes = await comprobanteService.obtenerComprobantesPorSolicitud(
      req.validated.params.solicitudId
    );
    res.status(200).json(comprobantes);
  } catch (err) {
    next(err);
  }
};

// Listar todos los comprobantes (admin)
const listarComprobantes = async (req, res, next) => {
  try {
    const lista = await comprobanteService.listarComprobantes();
    res.status(200).json(lista);
  } catch (err) {
    next(err);
  }
};

// Obtener comprobante por ID
const obtenerComprobantePorId = async (req, res, next) => {
  try {
    const comprobante = await comprobanteService.obtenerComprobantePorId(
      req.validated.params.id
    );
    res.status(200).json(comprobante);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registrarComprobante,
  obtenerComprobantesPorSolicitud,
  listarComprobantes,
  obtenerComprobantePorId
};
