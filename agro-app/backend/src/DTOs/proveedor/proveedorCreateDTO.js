// src/dtos/proveedor/ProveedorCreateDTO.js
class ProveedorCreateDTO {
  constructor(data) {
    this.nombre = data.nombre?.trim();
    this.contacto = data.contacto?.trim() || null;
    this.telefono = data.telefono?.trim() || null;
    this.direccion = data.direccion?.trim() || null;
  }

  validate() {
    if (!this.nombre) throw new Error("El nombre del proveedor es obligatorio");
  }
}

module.exports = ProveedorCreateDTO;