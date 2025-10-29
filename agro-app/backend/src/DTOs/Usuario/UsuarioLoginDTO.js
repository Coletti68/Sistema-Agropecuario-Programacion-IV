// src/dtos/usuario/UsuarioLoginDTO.js
class UsuarioLoginDTO {
  constructor(data) {
    this.email = data.email?.trim();
    this.password = data.password;
  }

  validate() {
    if (!this.email || !this.password) {
      throw new Error("Email y contraseña son obligatorios");
    }
  }
}

module.exports = UsuarioLoginDTO;