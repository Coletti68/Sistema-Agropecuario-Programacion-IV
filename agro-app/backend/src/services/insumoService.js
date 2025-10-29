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

async function crearInsumo(dto) {
  try {
    dto.validate();
    return await Insumo.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      precio_unitario: dto.precio_unitario,
      stock_actual: dto.stock_actual,
      proveedorid: dto.proveedorid
    });
  } catch (error) {
    console.error("Error al crear insumo:", error.message);
    throw new Error("No se pudo registrar el insumo");
  }
}

async function actualizarInsumo(insumoId, dto) {
  try {
    dto.validate();
    const insumo = await Insumo.findByPk(insumoId);
    if (!insumo) throw new Error("Insumo no encontrado");
    await insumo.update({
      descripcion: dto.descripcion,
      precio_unitario: dto.precio_unitario,
      stock_actual: dto.stock_actual,
      proveedorid: dto.proveedorid
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