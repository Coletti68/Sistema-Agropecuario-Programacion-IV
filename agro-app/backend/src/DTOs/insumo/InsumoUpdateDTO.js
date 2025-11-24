// src/dtos/insumo/InsumoUpdateDTO.js
class InsumoUpdateDTO {
  constructor(data) {
    this.descripcion = data.descripcion?.trim() || null;
    this.precio_unitario = parseFloat(data.precio_unitario);
    this.stock_actual = parseInt(data.stock_actual);
    this.proveedorid = data.proveedorid;
  }

  validate() {
    if (!this.precio_unitario || !this.proveedorid) {
      throw new Error("Precio y proveedor son obligatorios");
    }
  }
}

module.exports = InsumoUpdateDTO;