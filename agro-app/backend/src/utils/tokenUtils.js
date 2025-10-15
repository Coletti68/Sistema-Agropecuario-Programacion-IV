const jwt = require('jsonwebtoken');

function generarToken(usuario) {
  return jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {
    expiresIn: '2h'
  });
}

module.exports = { generarToken };
