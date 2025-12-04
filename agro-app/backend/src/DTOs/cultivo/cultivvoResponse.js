// src/dtos/cultivo/CultivoResponseDTO.js
class CultivoResponseDTO {
  constructor(cultivo) {
    this.id = cultivo.cultivoid;
    this.nombre = cultivo.nombre;
    this.descripcion = cultivo.descripcion;
  }
}

module.exports = CultivoResponseDTO;