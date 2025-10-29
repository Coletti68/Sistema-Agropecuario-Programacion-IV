// src/dtos/solicitud/SolicitudCreateDTO.js
class SolicitudCreateDTO {
  constructor(data) {
    this.usuarioid = data.usuarioid;
    this.insumos = data.insumos || []; // [{ insumoid, cantidad }]
    this.fechasolicitud = data.fechasolicitud ?? new Date();
  }

  validate() {
    if (!this.usuarioid || this.insumos.length === 0) {
      throw new Error("Solicitud inválida: faltan datos");
    }
  }
}

module.exports = SolicitudCreateDTO;