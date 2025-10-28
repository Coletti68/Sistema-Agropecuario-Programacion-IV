
const { Cultivo } = require('../models/cultivoModel');

async function listarCultivos() {
  try {
    return await Cultivo.findAll();
  } catch (error) {
    console.error("Error al listar cultivos:", error.message);
    throw new Error("No se pudo obtener la lista de cultivos");
  }
}

async function crearCultivo(dto) {
  try {
    dto.validate();
    return await Cultivo.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion
    });
  } catch (error) {
    console.error("Error al crear cultivo:", error.message);
    throw new Error("No se pudo crear el cultivo");
  }
}

async function actualizarCultivo(id, dto) {
  try {
    dto.validate();
    const cultivo = await Cultivo.findByPk(id);
    if (!cultivo) throw new Error("Cultivo no encontrado");
    await cultivo.update({
      nombre: dto.nombre,
      descripcion: dto.descripcion
    });
    return cultivo;
  } catch (error) {
    console.error("Error al actualizar cultivo:", error.message);
    throw new Error("No se pudo actualizar el cultivo");
  }
}

async function eliminarCultivo(id) {
  try {
    const cultivo = await Cultivo.findByPk(id);
    if (!cultivo) throw new Error("Cultivo no encontrado");
    await cultivo.destroy();
  } catch (error) {
    console.error("Error al eliminar cultivo:", error.message);
    throw new Error("No se pudo eliminar el cultivo");
  }
}

module.exports = {
  listarCultivos,
  crearCultivo,
  actualizarCultivo,
  eliminarCultivo
};