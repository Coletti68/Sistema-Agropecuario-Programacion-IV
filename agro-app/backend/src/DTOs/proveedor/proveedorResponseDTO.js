// src/dtos/proveedor/ProveedorResponseDTO.js
class ProveedorResponseDTO {
  constructor(proveedor) {
    this.id = proveedor.proveedorid;
    this.nombre = proveedor.nombre;
    this.contacto = proveedor.contacto;
    this.telefono = proveedor.telefono;
    this.direccion = proveedor.direccion;
  }
}

module.exports = ProveedorResponseDTO;