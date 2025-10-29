// src/dtos/pago/PagoResponseDTO.js
class PagoResponseDTO {
  constructor(pago) {
    this.id = pago.pagoid;
    this.solicitudid = pago.solicitudid;
    this.metodo = pago.metodo;
    this.monto = pago.monto;
    this.fecha = pago.fecha_pago;
    this.confirmado = pago.confirmado;
  }
}

module.exports = PagoResponseDTO;