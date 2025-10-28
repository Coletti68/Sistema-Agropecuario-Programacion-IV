// src/controllers/proveedorController.js
const ProveedorCreateDTO = require('../DTOs/proveedor/proveedorCreateDTO');
const ProveedorResponseDTO = require('../DTOs/proveedor/proveedorResponseDTO');
const {
  listarProveedores,
  crearProveedor
} = require('../services/proveedorService');

async function getProveedores(req, res) {
  try {
    const proveedores = await listarProveedores();
    res.json(proveedores.map(p => new ProveedorResponseDTO(p)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function postProveedor(req, res) {
  try {
    const dto = new ProveedorCreateDTO(req.body);
    const nuevo = await crearProveedor(dto);
    res.status(201).json(new ProveedorResponseDTO(nuevo));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getProveedores,
  postProveedor
};