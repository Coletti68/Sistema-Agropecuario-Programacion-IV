const insumoService = require('../services/insumoService');

const listarInsumos = async (req,res,next) => {
  try {
    const insumos = await insumoService.listarInsumos();
    res.status(200).json(insumos);
  } catch (err) {
    next(err);
  }
  
};

const crearInsumo = async (req,res,next) => {
  try {
    const insumo = await insumoService.crearInsumo(req.validatedBody);
    res.status(200).json(insumo);
  } catch (err) {
    next(err);
  }
};

const actualizarInsumo = async (req,res,next) => {
  try {
   const actualizar = await insumoService.actualizarInsumo(req.validated.params.insumoId,req.validatedBody);
   res.status(200).json(actualizar); 
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listarInsumos,
  crearInsumo,
  actualizarInsumo
};