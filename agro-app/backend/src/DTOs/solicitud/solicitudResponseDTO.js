// src/dtos/solicitud/SolicitudResponseDTO.js
class SolicitudResponseDTO {
  constructor(solicitud) {
    this.id = solicitud.solicitudid;
    this.fecha = solicitud.fechasolicitud;
    this.estado = solicitud.estado_actual;
    this.insumos = solicitud.SolicitudDetalles?.map(det => ({
      insumoid: det.insumoid,
      cantidad: det.cantidad
    })) || [];
  }
}

module.exports = SolicitudResponseDTO;