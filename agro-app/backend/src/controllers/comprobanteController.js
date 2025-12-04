const comprobanteService = require('../services/comprobanteService');

const registrarComprobante = async (req, res, next) => {
  try {
    const nuevo = await comprobanteService.registrarComprobante(req.validatedBody);
    res.status(200).json(nuevo);
  } catch (err) {
    next(err);
  }
};

const obtenerComprobantesPorSolicitud = async (req, res, next) => {
  try {
    const comprobantes = await comprobanteService.obtenerComprobantesPorSolicitud(
      req.params.solicitudId
    );
    res.status(200).json(comprobantes);
  } catch (err) {
    next(err);
  }
};


const listarComprobantes = async (req, res, next) => {
  try {
    const lista = await comprobanteService.listarComprobantes();
    res.status(200).json(lista);
  } catch (err) {
    next(err);
  }
};

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
