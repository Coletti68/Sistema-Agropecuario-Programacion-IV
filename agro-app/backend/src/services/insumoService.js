const { Insumo } = require('../models');

async function listarInsumos() {
  try {
    return await Insumo.findAll({ where: { activo: true } });
  } catch (error) {
    console.error('Error al listar insumos:', error.message);
    throw new Error('No se pudo obtener la lista de insumos');
  }
}

async function crearInsumo(data) {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Datos de insumo inválidos');
    }

    await Insumo.create({
  nombre: data.nombre,
  descripcion: data.descripcion,
  precio: data.precio, 
  stock: data.stock,   
  proveedorid: data.proveedorid,
  stock_minimo: data.stock_minimo,
  activo: true
});
  } catch (error) {
    console.error('Error al crear insumo:', error.message);
    throw new Error('No se pudo registrar el insumo');
  }
}

async function actualizarInsumo(insumoId, data) {
  try {
    const insumo = await Insumo.findByPk(insumoId);
    if (!insumo || !insumo.activo) throw new Error('Insumo no encontrado o inactivo');

    await insumo.update({
      descripcion: data.descripcion,
      precio_unitario: data.precio_unitario,
      stock_actual: data.stock_actual,
      proveedorid: data.proveedorid
    });

    return insumo;
  } catch (error) {
    console.error('Error al actualizar insumo:', error.message);
    throw new Error('No se pudo actualizar el insumo');
  }
}

async function desactivarInsumo(insumoId) {
  try {
    const insumo = await Insumo.findByPk(insumoId);
    if (!insumo || !insumo.activo) throw new Error('Insumo no encontrado o ya desactivado');

    await insumo.update({ activo: false });
    return { mensaje: 'Insumo desactivado exitosamente' };
  } catch (error) {
    console.error('Error al desactivar insumo:', error.message);
    throw new Error('No se pudo desactivar el insumo');
  }
}

module.exports = {
  listarInsumos,
  crearInsumo,
  actualizarInsumo,
  desactivarInsumo
};