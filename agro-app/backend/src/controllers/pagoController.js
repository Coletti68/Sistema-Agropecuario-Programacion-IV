const pagoService = require('../services/pagoService');

const registrarPago = async (req, res, next) => {
  try {
    const pago = await pagoService.registrarPago(req.validatedBody);
    res.status(201).json(pago);
  } catch (err) {
    next(err);
  }
};

const listarPagos = async (req, res, next) => {
  try {
    const pagos = await pagoService.listarPagos();
    res.json(pagos);
  } catch (err) {
    next(err);
  }
};

const listarPagosPorUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.validatedParams;
    const pagos = await pagoService.listarPagosPorUsuario(usuarioId);
    res.json(pagos);
  } catch (err) {
    next(err);
  }
};

const obtenerPagosPorSolicitud = async (req, res, next) => {
  try {
    const { solicitudId } = req.validatedParams;
    const pagos = await pagoService.obtenerPagosPorSolicitud(solicitudId);
    res.json(pagos);
  } catch (err) {
    next(err);
  }
};

const actualizarEstadoPago = async (req, res, next) => {
  try {
    const { pagoId } = req.validatedParams;
    const { estado_pago } = req.validatedBody;

    const result = await pagoService.actualizarEstadoPago(pagoId, estado_pago);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registrarPago,
  listarPagos,
  listarPagosPorUsuario,
  obtenerPagosPorSolicitud,
  actualizarEstadoPago
};
