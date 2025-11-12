// src/services/insumoService.js
const { Insumo } = require('../models/insumoModel');

async function listarInsumos() {
  try {
    return await Insumo.findAll();
  } catch (error) {
    console.error("Error al listar insumos:", error.message);
    throw new Error("No se pudo obtener la lista de insumos");
  }
}

async function crearInsumo(data) {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Datos de insumo inválidos');
    }

    return await Insumo.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio_unitario: data.precio_unitario,
      stock_actual: data.stock_actual,
      proveedorid: data.proveedorid
    });


  } catch (error) {
    console.error("Error al crear insumo:", error.message);
    throw new Error("No se pudo registrar el insumo");
  }
}

async function actualizarInsumo(insumoId, dto) {
  try {
    
    const insumo = await Insumo.findByPk(insumoId);
    if (!insumo) throw new Error("Insumo no encontrado");
    await insumo.update({
      descripcion: data.descripcion,
      precio_unitario: data.precio_unitario,
      stock_actual: data.stock_actual,
      proveedorid: data.proveedorid
    });

    return insumo;
  } catch (error) {
    console.error("Error al actualizar insumo:", error.message);
    throw new Error("No se pudo actualizar el insumo");
  }
}

module.exports = {
  listarInsumos,
  crearInsumo,
  actualizarInsumo
};