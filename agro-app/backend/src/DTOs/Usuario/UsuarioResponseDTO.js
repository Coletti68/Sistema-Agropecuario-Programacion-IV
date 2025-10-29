
class UsuarioResponseDTO {
  constructor(usuario) {
    this.id = usuario.usuarioid;
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.telefono = usuario.telefono;
    this.dni = usuario.dni;
    this.direccion = usuario.direccion;
    this.rolid = usuario.rolid;
    this.activo = usuario.activo;
  }
}

module.exports = UsuarioResponseDTO;