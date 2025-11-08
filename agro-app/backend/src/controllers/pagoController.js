const pagoService = require('../services/pagoService');

const registrarPago = async (req,res,next) => {
  try {
    const pago = await pagoService.registrarPago(req.validatedBody);
    res.status(201).json(pago);
  } catch (err) {
    next(err);
  }
};

const obtenerPagosPorSolicitud = async (req,res,next) => {
  try {
    const listar = await pagoService.obtenerPagosPorSolicitud(req.validated.params.solicitudId);
    res.status(200).json(listar);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registrarPago,
  obtenerPagosPorSolicitud
};