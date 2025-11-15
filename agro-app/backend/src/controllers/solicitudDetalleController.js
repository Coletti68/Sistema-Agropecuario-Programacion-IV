const solicitudDetalleService = require('../services/solicitudDetalleService');

const agregarDetalle = async (req, res, next) => {
  try {
    const { insumoid, cantidad, preciounitario } = req.validatedBody;
    const detalle = await solicitudDetalleService.agregarDetalle(
      req.validated.params.solicitudId,
      insumoid,
      cantidad,
      preciounitario
    );
    res.status(201).json(detalle);
  } catch (err) {
    next(err);
  }
};

const listarDetallesPorSolicitud = async (req, res, next) => {
  try {
    const detalles = await solicitudDetalleService.listarDetallesPorSolicitud(
      req.validated.params.solicitudId
    );
    res.status(200).json(detalles);
  } catch (err) {
    next(err);
  }
};

const obtenerDetallePorId = async (req, res, next) => {
  try {
    const detalle = await solicitudDetalleService.obtenerDetallePorId(
      req.validated.params.detalleId
    );
    res.status(200).json(detalle);
  } catch (err) {
    next(err);
  }
};

const actualizarCantidad = async (req, res, next) => {
  try {
    const { cantidad } = req.validatedBody;
    const resultado = await solicitudDetalleService.actualizarCantidad(
      req.validated.params.detalleId,
      cantidad
    );
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

const actualizarPrecio = async (req, res, next) => {
  try {
    const { preciounitario } = req.validatedBody;
    const resultado = await solicitudDetalleService.actualizarPrecio(
      req.validated.params.detalleId,
      preciounitario
    );
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

const eliminarDetalle = async (req, res, next) => {
  try {
    const resultado = await solicitudDetalleService.eliminarDetalle(
      req.validated.params.detalleId
    );
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  agregarDetalle,
  listarDetallesPorSolicitud,
  obtenerDetallePorId,
  actualizarCantidad,
  actualizarPrecio,
  eliminarDetalle
};
