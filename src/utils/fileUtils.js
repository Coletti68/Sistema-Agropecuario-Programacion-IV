const fs = require('fs');

function eliminarArchivo(ruta) {
  if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
}

module.exports = { eliminarArchivo };
