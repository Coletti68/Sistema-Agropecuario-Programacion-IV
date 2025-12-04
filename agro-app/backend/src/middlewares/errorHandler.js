//los 4 parametros dentro de la funcion son obligatorios para que express lo reconozca como middleware de manejo de errores
function errorHandler(err, req, res, next) {
  console.error([ERROR], err.message);
  const status = err.status || 500;
  const mensaje = err.message || 'Error Interno del Servidor';
  res.status(status).json({ error: mensaje });
}

module.exports = errorHandler;
