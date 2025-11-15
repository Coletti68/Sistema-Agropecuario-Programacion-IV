const pagoService = require('../services/pagoService');

// Registrar Pago
const registrarPago = async (req, res, next) => {
  try {
    const pago = await pagoService.registrarPago(req.validatedBody);
    res.status(201).json(pago);
  } catch (err) {
    next(err);
  }
};

// Listar todos los pagos (admin)
const listarPagos = async (req, res, next) => {
  try {
    const pagos = await pagoService.listarPagos();
    res.status(200).json(pagos);
  } catch (err) {
    next(err);
  }
};

// Listar pagos propios (productor)
const listarPagosPorUsuario = async (req, res, next) => {
  try {
    const usuarioId = req.validated.params.usuarioId;
    const pagos = await pagoService.listarPagosPorUsuario(usuarioId);
    res.status(200).json(pagos);
  } catch (err) {
    next(err);
  }
};

// Actualizar estado de pago (admin)
const actualizarEstadoPago = async (req, res, next) => {
  try {
    const pagoId = req.validated.params.pagoId;
    const { confirmado } = req.validatedBody;

    const resultado = await pagoService.actualizarEstadoPago(pagoId, confirmado);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

// Obtener pagos por solicitud
const obtenerPagosPorSolicitud = async (req, res, next) => {
  try {
    const solicitudId = req.validated.params.solicitudId;

    const pagos = await pagoService.obtenerPagosPorSolicitud(solicitudId);
    res.status(200).json(pagos);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registrarPago,
  listarPagos,
  listarPagosPorUsuario,
  actualizarEstadoPago,
  obtenerPagosPorSolicitud
};
