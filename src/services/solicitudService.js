// src/services/solicitudService.js
const { Solicitud, SolicitudDetalle } = require('../models/solicitudDetalleModel');
const { Solicitud, SolicitudDetalle } = require('../models/solicitudModel');


async function crearSolicitud(dto) {
  try {
    dto.validate();
    const nueva = await Solicitud.create({
      usuarioid: dto.usuarioid,
      fechasolicitud: dto.fechasolicitud
    });

    const detalles = dto.insumos.map(item => ({
      solicitudid: nueva.solicitudid,
      insumoid: item.insumoid,
      cantidad: item.cantidad
    }));

    await SolicitudDetalle.bulkCreate(detalles);
    return await Solicitud.findByPk(nueva.solicitudid, {
      include: [SolicitudDetalle]
    });
  } catch (error) {
    console.error("Error al crear solicitud:", error.message);
    throw new Error("No se pudo registrar la solicitud");
  }
}

async function obtenerSolicitudesPorUsuario(usuarioid) {
  try {
    return await Solicitud.findAll({
      where: { usuarioid },
      include: [SolicitudDetalle]
    });
  } catch (error) {
    console.error("Error al obtener solicitudes:", error.message);
    throw new Error("No se pudieron obtener las solicitudes");
  }
}

module.exports = {
  crearSolicitud,
  obtenerSolicitudesPorUsuario
};