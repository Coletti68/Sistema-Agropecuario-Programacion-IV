// src/dtos/pago/PagoCreateDTO.js
class PagoCreateDTO {
  constructor(data) {
    this.solicitudid = data.solicitudid;
    this.metodo = data.metodo?.trim();
    this.monto = parseFloat(data.monto);
    this.fecha_pago = data.fecha_pago ?? new Date();
    this.confirmado = data.confirmado ?? false;
  }

  validate() {
    if (!this.solicitudid || !this.metodo || !this.monto) {
      throw new Error("Faltan campos obligatorios para el pago");
    }
  }
}

module.exports = PagoCreateDTO;