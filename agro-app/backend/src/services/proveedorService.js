
const { Proveedor } = require('../models/proveedorModel');

async function listarProveedores() {
  try {
    return await Proveedor.findAll();
  } catch (error) {
    console.error("Error al listar proveedores:", error.message);
    throw new Error("No se pudo obtener la lista de proveedores");
  }
}

async function crearProveedor(data) {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Datos de proveedor inválidos');
    }

    return await Proveedor.create({
      nombre: data.nombre,
      contacto: data.contacto,
      telefono: data.telefono,
      direccion: data.direccion
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