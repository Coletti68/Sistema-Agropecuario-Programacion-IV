// src/dtos/comprobante/ComprobanteCreateDTO.js
class ComprobanteCreateDTO {
  constructor(data) {
    this.solicitudid = data.solicitudid;
    this.fecha_entrega = data.fecha_entrega ?? new Date();
    this.entregado_por = data.entregado_por?.trim();
    this.recibido_por = data.recibido_por?.trim();
    this.observaciones = data.observaciones?.trim() || null;
  }

  validate() {
    if (!this.solicitudid || !this.entregado_por || !this.recibido_por) {
      throw new Error("Faltan campos obligatorios para el comprobante");
    }
  }
}

module.exports = ComprobanteCreateDTO;