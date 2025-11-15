const historialCultivoService = require('../services/historialCultivoService');

// POST /historial
const registrarCambio = async (req, res, next) => {
  try {
    const registro = await historialCultivoService.registrarCambio(req.validatedBody);
    res.status(201).json(registro);
  } catch (err) {
    next(err);
  }
};

// GET /historial
const listarHistorial = async (req, res, next) => {
  try {
    const historial = await historialCultivoService.listarHistorial();
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

// GET /historial/:id
const obtenerPorId = async (req, res, next) => {
  try {
    const registro = await historialCultivoService.obtenerPorId(req.validated.params.id);
    res.status(200).json(registro);
  } catch (err) {
    next(err);
  }
};

// DELETE /historial/:id
const eliminarRegistro = async (req, res, next) => {
  try {
    const resultado = await historialCultivoService.eliminarRegistro(req.validated.params.id);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

// GET /historial/usuario/:usuarioId
const listarPorUsuario = async (req, res, next) => {
  try {
    const historial = await historialCultivoService.listarPorUsuario(
      req.validated.params.usuarioId
    );
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

// GET /historial/asignacion/:usuariocultivoId
const listarPorAsignacion = async (req, res, next) => {
  try {
    const historial = await historialCultivoService.listarPorAsignacion(
      req.validated.params.usuariocultivoId
    );
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

// GET /historial/detalles/:usuariocultivoId
const listarConDetalles = async (req, res, next) => {
  try {
    const historial = await historialCultivoService.listarConDetalles(
      req.validated.params.usuariocultivoId
    );
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

// PUT /historial/:id
const editarRegistro = async (req, res, next) => {
  try {
    const registro = await historialCultivoService.editarRegistro(
      req.validated.params.id,
      req.validatedBody
    );
    res.status(200).json(registro);
  } catch (err) {
    next(err);
  }
};

// POST /mis-cultivos/:id/historial
const agregarEntradaDesdeRuta = async (req, res, next) => {
  try {
    const registro = await historialCultivoService.agregarEntradaDesdeRuta(
      req.validated.params.id,
      req.validatedBody
    );
    res.status(201).json(registro);
  } catch (err) {
    next(err);
  }
};

// GET /historial/cultivo/:usuariocultivoId
const listarPorCultivoAsignado = async (req, res, next) => {
  try {
    const historial = await historialCultivoService.listarPorCultivoAsignado(
      req.validated.params.usuariocultivoId
    );
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  registrarCambio,
  listarHistorial,
  obtenerPorId,
  eliminarRegistro,
  listarPorUsuario,
  listarPorAsignacion,
  listarConDetalles,
  editarRegistro,
  agregarEntradaDesdeRuta,
  listarPorCultivoAsignado
};