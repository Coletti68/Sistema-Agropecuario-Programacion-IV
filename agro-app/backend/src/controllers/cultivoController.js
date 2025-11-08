const cultivoService = require ('../services/cultivoService');


const listarCultivos = async (req,res,next) => {
  try {
    const cultivos = await cultivoService.listarCultivos();
    res.status(200).json(cultivos);
  } catch (err) {
    next (err);
  }
  
};

const crearCultivo = async (req,res,next) => {
  try {
    const cultivo = await cultivoService.crearCultivo(req.validatedBody);
    res.status(200).json(cultivo);
  } catch (err) {
    next(err);
  }
  
};

const actualizarCultivo = async (req, res, next) => {
  try {
    const cultivo = await cultivoService.actualizarCultivo(req.validated.params.id, req.validatedBody);
    res.status(200).json(cultivo);
  } catch (err) {
    next(err);
  }
  
};

const eliminarCultivo = async (req, res ,next) => {
  try {
    await cultivoService.eliminarCultivo(req.validated.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
    
  }

};

module.exports = {
  listarCultivos,
  crearCultivo,
  actualizarCultivo,
  eliminarCultivo
};

