
class InsumoCreateDTO {
  constructor(data) {
    this.nombre = data.nombre?.trim();
    this.descripcion = data.descripcion?.trim() || null;
    this.precio_unitario = parseFloat(data.precio_unitario);
    this.stock_actual = parseInt(data.stock_actual) || 0;
    this.proveedorid = data.proveedorid;
  }

  validate() {
    if (!this.nombre || !this.precio_unitario || !this.proveedorid) {
      throw new Error("Faltan campos obligatorios para el insumo");
    }
  }
}

module.exports = InsumoCreateDTO;