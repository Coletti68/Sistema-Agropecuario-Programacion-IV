// src/dtos/usuario/UsuarioRegisterDTO.js
class UsuarioRegisterDTO {
  constructor(data) {
    this.rolid = data.rolid;
    this.nombre = data.nombre?.trim();
    this.email = data.email?.trim();
    this.telefono = data.telefono?.trim() || null;
    this.dni = data.dni?.trim();
    this.direccion = data.direccion?.trim() || null;
    this.passwordhash = data.passwordhash;
  }

  validate() {
    if (!this.nombre || !this.email || !this.passwordhash || !this.rolid) {
      throw new Error("Faltan campos obligatorios para el registro");
    }
  }
}

module.exports = UsuarioRegisterDTO;