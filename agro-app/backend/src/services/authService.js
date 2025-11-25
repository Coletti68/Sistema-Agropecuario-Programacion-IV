const usuarioService = require('./usuarioService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// 🔑 Generar token
function generarToken(usuario) {
  const payload = {
    usuarioid: usuario.usuarioid,
    email: usuario.email,
    rolid: usuario.rolid
  };
  return jwt.sign(payload, jwtSecret, { expiresIn: '2h' });
}

async function loginUsuario(email, password) {
  const usuario = await usuarioService.obtenerUsuarioPorEmail(email);
  if (!usuario) throw new Error('Credenciales inválidas');

  const valido = await bcrypt.compare(password, usuario.passwordhash);
  if (!valido) throw new Error('Credenciales inválidas');

  const token = generarToken(usuario);
  return { usuario, token };
}
// 🔑 Verificar token
function verificarToken(token) {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
}

// 📝 Registro de usuario (productor)
async function crearUsuario({ nombre, email, telefono, dni, direccion, password }) {
  const rolid = 1; // fijo: productor

  if (!nombre || !email || !password) {
    throw new Error('Faltan campos obligatorios');
  }

  // Validar duplicados
  const existeEmail = await usuarioService.obtenerUsuarioPorEmail(email);
  if (existeEmail) throw new Error('El email ya está registrado');

  if (dni) {
    const existeDni = await usuarioService.obtenerUsuarioPorDni(dni);
    if (existeDni) throw new Error('El DNI ya está registrado');
  }

  // Encriptar contraseña
  const passwordhash = await bcrypt.hash(password, 10);

  // Crear usuario en la base
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

// 🔐 Login
// async function loginUsuario(email, password) {
//   const usuario = await usuarioService.obtenerUsuarioPorEmail(email);
//   if (!usuario) throw new Error('Credenciales inválidas');

//   const valido = await bcrypt.compare(password, usuario.passwordhash);
//   if (!valido) throw new Error('Credenciales inválidas');

//   const token = generarToken(usuario);
//   return { usuario, token };
// }
async function loginUsuario(email, password) {
  const usuario = await usuarioService.obtenerUsuarioPorEmail(email);

  // 👀 Log para ver qué trae la DB
  console.log("Login - usuario encontrado:", usuario ? usuario.toJSON() : null);

  if (!usuario) throw new Error('Credenciales inválidas');

  // 👀 Log para ver la contraseña que llega y el hash guardado
  console.log("Login - password ingresado:", password);
  console.log("Login - hash en DB:", usuario.passwordhash);

  const valido = await bcrypt.compare(password, usuario.passwordhash);

  // 👀 Log para ver si la comparación fue true/false
  console.log("Login - resultado bcrypt.compare:", valido);

  if (!valido) throw new Error('Credenciales inválidas');

  const token = generarToken(usuario);
  return { usuario, token };
}

// 🔐 Validar credenciales (para authController)
async function validarCredenciales(email, password) {
  if (!email || !password) throw new Error('Email y contraseña son obligatorios');

  const usuario = await usuarioService.obtenerUsuarioPorEmail(email);
  if (!usuario) return null;

  const valido = await bcrypt.compare(password, usuario.passwordhash);
  return valido ? usuario : null;
}

async function obtenerUsuarioPorId(id) {
  return await usuarioService.obtenerUsuarioPorId(id);

}

module.exports = {
  crearUsuario,
  loginUsuario,
  validarCredenciales,
  generarToken,
  verificarToken,
  obtenerUsuarioPorId
};