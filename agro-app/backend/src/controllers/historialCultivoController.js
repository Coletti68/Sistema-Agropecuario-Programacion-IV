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
    const registro = await historialCultivoService.obtenerPorId(req.validatedParams.id);
    res.status(200).json(registro);
  } catch (err) {
    next(err);
  }
};

// DELETE /historial/:id
const eliminarRegistro = async (req, res, next) => {
  try {
    const resultado = await historialCultivoService.eliminarRegistro(req.validatedParams.id);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

// GET /historial/usuario/:usuarioId
// GET /historial/usuario/:usuarioId
const listarPorUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.validatedParams;
    const historial = await historialCultivoService.listarPorUsuario(usuarioId);
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

// GET /historial/asignacion/:usuariocultivoId
const listarPorAsignacion = async (req, res, next) => {
  try {
    const { usuariocultivoId } = req.validatedParams;
    const historial = await historialCultivoService.listarPorAsignacion(usuariocultivoId);
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};

// GET /historial/detalles/:usuariocultivoId
const listarConDetalles = async (req, res, next) => {
  try {
    const { usuariocultivoId } = req.validatedParams;
    const historial = await historialCultivoService.listarConDetalles(usuariocultivoId);
    res.status(200).json(historial);
  } catch (err) {
    next(err);
  }
};


// PUT /historial/:id
const editarRegistro = async (req, res, next) => {
  try {
    const registro = await historialCultivoService.editarRegistro(
      req.validatedParams.id,
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
      req.validatedParams.id,
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
      req.validatedParams.usuariocultivoId
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
