
const { Proveedor } = require('../models/proveedorModel');

async function listarProveedores() {
  try {
    return await Proveedor.findAll();
  } catch (error) {
    console.error("Error al listar proveedores:", error.message);
    throw new Error("No se pudo obtener la lista de proveedores");
  }
}

async function crearProveedor(dto) {
  try {
    dto.validate();
    return await Proveedor.create({
      nombre: dto.nombre,
      contacto: dto.contacto,
      telefono: dto.telefono,
      direccion: dto.direccion
    });
  } catch (error) {
    console.error("Error al crear proveedor:", error.message);
    throw new Error("No se pudo registrar el proveedor");
  }
}

module.exports = {
  listarProveedores,
  crearProveedor
};