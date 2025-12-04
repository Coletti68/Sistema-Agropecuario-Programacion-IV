const proveedorService = require('../services/proveedorService');

const listarProveedores = async (req, res, next) => {
  try {
    const proveedores = await proveedorService.listarProveedores();
    res.status(200).json(proveedores);
  } catch (err) {
    next(err);
  }
};

const crearProveedor = async (req, res, next) => {
  try {
    const nuevo = await proveedorService.crearProveedor(req.validatedBody);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

const actualizarProveedor = async (req, res, next) => {
  try {
    const proveedorActualizado = await proveedorService.actualizarProveedor(
      req.validated.params.id,
      req.validatedBody
    );
    res.status(200).json(proveedorActualizado);
  } catch (err) {
    next(err);
  }
};

const desactivarProveedor = async (req, res, next) => {
  try {
    const resultado = await proveedorService.desactivarProveedor(
      req.validated.params.id
    );
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listarProveedores,
  crearProveedor,
  actualizarProveedor,
  desactivarProveedor
};
