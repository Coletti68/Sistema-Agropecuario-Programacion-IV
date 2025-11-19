
const Proveedor = require('../models/proveedorModel');

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
async function actualizarProveedor(id, data) {
  try {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor || !proveedor.activo) throw new Error('Proveedor no encontrado o inactivo');

    await proveedor.update({
      nombre: data.nombre,
      contacto: data.contacto,
      telefono: data.telefono,
      direccion: data.direccion
    });

    return proveedor;
  } catch (error) {
    console.error('Error al actualizar proveedor:', error.message);
    throw new Error('No se pudo actualizar el proveedor');
  }
}

async function desactivarProveedor(id) {
  try {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor || !proveedor.activo) throw new Error('Proveedor no encontrado o ya desactivado');

    await proveedor.update({ activo: false });
    return { mensaje: 'Proveedor desactivado exitosamente' };
  } catch (error) {
    console.error('Error al desactivar proveedor:', error.message);
    throw new Error('No se pudo desactivar el proveedor');
  }
}

module.exports = {
  listarProveedores,
  crearProveedor,
  actualizarProveedor,
  desactivarProveedor
};