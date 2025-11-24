const insumoService = require('../services/insumoService');

const listarInsumos = async (req, res, next) => {
  try {
    const insumos = await insumoService.listarInsumos();
    res.status(200).json(insumos);
  } catch (err) {
    next(err);
  }
};

const crearInsumo = async (req, res, next) => {
  try {
    const insumo = await insumoService.crearInsumo(req.validatedBody);
    res.status(201).json(insumo);
  } catch (err) {
    next(err);
  }
};

const actualizarInsumo = async (req, res, next) => {
  try {
    const insumoId = req.validated?.params?.insumoId;
const data = req.validatedBody;

if (!insumoId || !data) {
  return res.status(400).json({ error: 'Datos inválidos o ID faltante' });
}

const insumo = await insumoService.actualizarInsumo(insumoId, data);
    res.status(200).json(insumo);
  } catch (err) {
    next(err);
  }
};

const desactivarInsumo = async (req, res, next) => {
  try {
    const resultado = await insumoService.desactivarInsumo(
      req.validated.params.id      
    );
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listarInsumos,
  crearInsumo,
  actualizarInsumo,
  desactivarInsumo,
};
