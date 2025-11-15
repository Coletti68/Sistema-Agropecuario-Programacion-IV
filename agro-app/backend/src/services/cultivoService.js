
const { Cultivo } = require('../models');

async function listarCultivos() {
  try {
    return await Cultivo.findAll();
  } catch (error) {
    console.error("Error al listar cultivos:", error.message);
    throw new Error("No se pudo obtener la lista de cultivos");
  }
}

async function crearCultivo(data) {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Datos de cultivo inválidos');
    }

    return await Cultivo.create({
      nombre: data.nombre,
      descripcion: data.descripcion
    });

  } catch (error) {
    console.error("Error al crear cultivo:", error.message);
    throw new Error("No se pudo crear el cultivo");
  }
}

async function actualizarCultivo(id, data) {
  try {
    const cultivo = await Cultivo.findByPk(id);
    if (!cultivo) throw new Error('Cultivo no encontrado');

    await cultivo.update({
      nombre: data.nombre,
      descripcion: data.descripcion
    });


    return cultivo;
  } catch (error) {
    console.error("Error al actualizar cultivo:", error.message);
    throw new Error("No se pudo actualizar el cultivo");
  }
}

async function desactivarCultivo(id) {
  try {
    const cultivo = await Cultivo.findByPk(id);
    if (!cultivo) throw new Error('Cultivo no encontrado');

    await cultivo.update({ activo: false });
    return { mensaje: 'Cultivo desactivado exitosamente' };
  } catch (error) {
    console.error('Error al desactivar cultivo:', error.message);
    throw new Error('No se pudo desactivar el cultivo');
  }
}



module.exports = {
  listarCultivos,
  crearCultivo,
  actualizarCultivo,
  desactivarCultivo

};