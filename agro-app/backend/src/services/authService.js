const usuarioService = require('./usuarioService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// 🔐 Registro de usuario
async function crearUsuario({ nombre, email, telefono, dni, direccion, password }) {
  const rolid = 1; // 🔒 fijo: productor

  if (!nombre || !email || !password) {
    throw new Error('Faltan campos obligatorios');
  }

  const existeEmail = await usuarioService.obtenerUsuarioPorEmail(email);
  if (existeEmail) throw new Error('El email ya está registrado');

  if (dni) {
    const existeDni = await usuarioService.obtenerUsuarioPorDni(dni);
    if (existeDni) throw new Error('El DNI ya está registrado');
  }

  const passwordhash = await bcrypt.hash(password, 10);

  const nuevoUsuario = await usuarioService.crearUsuario({
    rolid,
    nombre,
    email,
    telefono,
    dni,
    direccion,
    passwordhash,
    activo: true
  });

  return nuevoUsuario;
}

// 🔑 Login
async function validarCredenciales(email, password) {
  if (!email || typeof email !== 'string' || email.trim() === '') {
    throw new Error('El email es obligatorio y debe ser un texto no vacío');
  }

  if (!password || typeof password !== 'string' || password.trim() === '') {
    throw new Error('La contraseña es obligatoria y debe ser un texto no vacío');
  }

  const usuario = await usuarioService.obtenerUsuarioPorEmail(email);
  if (!usuario) return null;

  const valido = await bcrypt.compare(password, usuario.passwordhash);
  return valido ? usuario : null;
}

// 🎟️ Token
function generarToken(usuario) {
  const payload = {
    id_usuario: usuario.id_usuario,
    email: usuario.email,
    id_rol: usuario.id_rol
  };
  return jwt.sign(payload, jwtSecret, { expiresIn: '2h' });
}

function verificarToken(token) {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  crearUsuario,
  validarCredenciales,
  generarToken,
  verificarToken
};
