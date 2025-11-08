const comprobanteService = require('../services/comprobanteService');

const registrarComprobante = async (req,res,next) => {
try {
  const nuevo = await comprobanteService.registrarComprobante(req.validatedBody);
  res.status(200).json(nuevo);
} catch (err) {
  next(err);
}
};

const obtenerComprobantesPorSolicitud = async (req,res,next) => {
  try {
   const comprobantes = await comprobanteService.obtenerComprobantesPorSolicitud(req.validated.params.solicitudId);
   res.status(200).json(comprobantes); 
  } catch (err) {
    next(err);
  }
  
};

module.exports = {
  registrarComprobante,
  obtenerComprobantesPorSolicitud
};