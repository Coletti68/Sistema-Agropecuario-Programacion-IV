// src/dtos/comprobante/ComprobanteResponseDTO.js
class ComprobanteResponseDTO {
  constructor(comp) {
    this.id = comp.comprobanteid;
    this.solicitudid = comp.solicitudid;
    this.fecha = comp.fecha_entrega;
    this.entregado_por = comp.entregado_por;
    this.recibido_por = comp.recibido_por;
    this.observaciones = comp.observaciones;
  }
}

module.exports = ComprobanteResponseDTO;