
const { Cultivo, UsuarioCultivo, HistorialCultivo } = require('../models');

async function listarCultivosPorUsuario(usuarioid) {
  try {
    if (!usuarioid) throw new Error('Usuario no identificado'); 

    return await UsuarioCultivo.findAll({
      where: { usuarioid },
      include: [
        { model: Cultivo },
        { model: HistorialCultivo }
      ]
    });
  } catch (error) {
    console.error("Error al listar cultivos:", error.message);
    throw new Error("No se pudo obtener la lista de cultivos");
  }
}



async function crearCultivo(data, usuarioid) {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Datos de cultivo inválidos');
    }

    const cultivo = await Cultivo.create({
      nombre: data.nombre,
      descripcion: data.descripcion
    });
 
    const usuarioCultivo = await UsuarioCultivo.create({
      usuarioid,
      cultivoid: cultivo.cultivoid, 
      latitud: data.latitud,
      longitud: data.longitud,
      fechasiembra: data.fechasiembra
    });

    if (data.observaciones) {
      await HistorialCultivo.create({
  historialid: undefined, 
  usuariocultivoid: nuevaAsignacion.usuariocultivoid,
  usuarioid: data.usuarioid,
  latitud: data.latitud !== '' ? parseFloat(data.latitud) : null,
  longitud: data.longitud !== '' ? parseFloat(data.longitud) : null,
  fecha: new Date(),
  observaciones: data.observaciones
});
}

    return await UsuarioCultivo.findByPk(usuarioCultivo.usuariocultivoid, {
      include: [
        { model: Cultivo, attributes: ['nombre', 'descripcion'] },
        { model: HistorialCultivo }
      ]
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

const eliminarCultivo = async (id) => {
  const cultivo = await Cultivo.findByPk(id);
  if (!cultivo) throw new Error('Cultivo no encontrado');

  await cultivo.destroy();
  return { mensaje: 'Cultivo eliminado exitosamente' };
};



module.exports = {
  listarCultivosPorUsuario,
  crearCultivo,
  actualizarCultivo,
  desactivarCultivo,
  eliminarCultivo

};