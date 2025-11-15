const { HistorialCultivo } = require('../models/historialCultivoModel');
const { Usuario } = require('../models/usuarioModel');
const { UsuarioCultivo } = require('../models/usuarioCultivoModel');
const { Cultivo } = require('../models/cultivoModel');

async function registrarCambio(data) {
  try {
    return await HistorialCultivo.create(data);
  } catch (error) {
    console.error('Error al registrar cambio:', error.message);
    throw new Error('No se pudo registrar el cambio en el historial');
  }
}

async function listarHistorial() {
  try {
    return await HistorialCultivo.findAll({
      include: [
        { model: Usuario, attributes: ['nombre', 'email'] },
        { model: UsuarioCultivo, include: [{ model: Cultivo, attributes: ['nombre'] }] }
      ]
    });
  } catch (error) {
    console.error('Error al listar historial:', error.message);
    throw new Error('No se pudo obtener el historial');
  }
}

async function obtenerPorId(historialId) {
  try {
    const registro = await HistorialCultivo.findByPk(historialId, {
      include: [
        { model: Usuario, attributes: ['nombre'] },
        { model: UsuarioCultivo, include: [{ model: Cultivo, attributes: ['nombre'] }] }
      ]
    });
    if (!registro) throw new Error('Registro no encontrado');
    return registro;
  } catch (error) {
    console.error('Error al obtener registro:', error.message);
    throw new Error('No se pudo obtener el registro');
  }
}

async function eliminarRegistro(historialId) {
  try {
    const eliminados = await HistorialCultivo.destroy({ where: { historialid: historialId } });
    if (eliminados === 0) throw new Error('Registro no encontrado');
    return { mensaje: 'Registro eliminado exitosamente' };
  } catch (error) {
    console.error('Error al eliminar registro:', error.message);
    throw new Error('No se pudo eliminar el registro');
  }
}

async function listarPorUsuario(usuarioId) {
  try {
    return await HistorialCultivo.findAll({
      where: { usuarioid: usuarioId },
      include: [{ model: UsuarioCultivo, include: [{ model: Cultivo, attributes: ['nombre'] }] }]
    });
  } catch (error) {
    console.error('Error al listar historial por usuario:', error.message);
    throw new Error('No se pudo listar historial por usuario');
  }
}

async function listarPorAsignacion(usuariocultivoId) {
  try {
    return await HistorialCultivo.findAll({
      where: { usuariocultivoid: usuariocultivoId },
      include: [{ model: Usuario, attributes: ['nombre'] }]
    });
  } catch (error) {
    console.error('Error al listar historial por asignación:', error.message);
    throw new Error('No se pudo listar historial por asignación');
  }
}

async function listarConDetalles(usuariocultivoId) {
  try {
    return await HistorialCultivo.findAll({
      where: { usuariocultivoid: usuariocultivoId },
      include: [
        { model: Usuario, attributes: ['nombre', 'email'] },
        { model: UsuarioCultivo, include: [{ model: Cultivo, attributes: ['nombre', 'descripcion'] }] }
      ]
    });
  } catch (error) {
    console.error('Error al listar historial con detalles:', error.message);
    throw new Error('No se pudo listar historial con detalles');
  }
}
//  PUT /historial/:id
async function editarRegistro(historialId, data) {
  try {
    const registro = await HistorialCultivo.findByPk(historialId);
    if (!registro) throw new Error('Registro no encontrado');

    await registro.update({
      latitud: data.latitud,
      longitud: data.longitud,
      observaciones: data.observaciones
    });

    return registro;
  } catch (error) {
    console.error('Error al editar registro:', error.message);
    throw new Error('No se pudo editar el registro');
  }
}

//  POST /mis-cultivos/:id/historial
async function agregarEntradaDesdeRuta(usuariocultivoId, data) {
  try {
    const cultivo = await UsuarioCultivo.findByPk(usuariocultivoId);
    if (!cultivo || !cultivo.activo) throw new Error('Cultivo asignado no válido');

    return await HistorialCultivo.create({
      usuariocultivoid: usuariocultivoId,
      usuarioid: cultivo.usuarioid,
      latitud: data.latitud,
      longitud: data.longitud,
      observaciones: data.observaciones
    });
  } catch (error) {
    console.error('Error al agregar entrada desde ruta:', error.message);
    throw new Error('No se pudo registrar el historial');
  }
}

//  GET /historial/asignacion/:usuarioCultivoId
async function listarPorCultivoAsignado(usuariocultivoId) {
  return listarPorAsignacion(usuariocultivoId); // alias directo
}
module.exports = {
  registrarCambio,
  listarHistorial,
  obtenerPorId,
  eliminarRegistro,
  listarPorUsuario,
  listarPorAsignacion,
  listarConDetalles,
  editarRegistro,
  agregarEntradaDesdeRuta,
  listarPorCultivoAsignado
};
