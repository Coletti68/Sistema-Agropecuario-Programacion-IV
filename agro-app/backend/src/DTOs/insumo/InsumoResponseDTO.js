// src/dtos/insumo/InsumoResponseDTO.js
class InsumoResponseDTO {
  constructor(insumo) {
    this.id = insumo.insumoid;
    this.nombre = insumo.nombre;
    this.descripcion = insumo.descripcion;
    this.precio = insumo.precio_unitario;
    this.stock = insumo.stock_actual;
    this.proveedorid = insumo.proveedorid;
  }
}

module.exports = InsumoResponseDTO;