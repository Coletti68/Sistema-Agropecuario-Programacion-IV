// src/dtos/cultivo/CultivoCreateDTO.js
class CultivoCreateDTO {
  constructor(data) {
    this.nombre = data.nombre?.trim();
    this.descripcion = data.descripcion?.trim() || null;
  }

  validate() {
    if (!this.nombre) throw new Error("El nombre del cultivo es obligatorio");
  }
}

module.exports = CultivoCreateDTO;