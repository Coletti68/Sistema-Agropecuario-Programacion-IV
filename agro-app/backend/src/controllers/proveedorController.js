const proveedorService = require ('../services/proveedorService');

const listarProveedores = async (req,res,next) => {
  try {
    const proveedores = await proveedorService.listarProveedores();
    res.status(200).json(proveedores);
  } catch (err) {
    next(err);
  }
};

const crearProveedor = async (req,res,next) => {
  try {
    const nuevo = await proveedorService.crearProveedor(req.validatedBody);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listarProveedores,
  crearProveedor
};

