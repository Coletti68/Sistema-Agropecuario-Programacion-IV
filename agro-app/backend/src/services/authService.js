const usuarioService = require('./usuarioService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// Token
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

//  Registro de usuario
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
//registrar productor
async function registrarProductor(data) {
  const campos = ['nombre', 'email', 'telefono', 'dni', 'direccion', 'password'];
  for (const campo of campos) {
    if (!data[campo]) throw new Error(`El campo '${campo}' es obligatorio`);
  }

  const existeEmail = await Usuario.findOne({ where: { email: data.email } });
  if (existeEmail) throw new Error('El email ya está registrado');

  const existeDni = await Usuario.findOne({ where: { dni: data.dni } });
  if (existeDni) throw new Error('El DNI ya está registrado');

  const passwordhash = await bcrypt.hash(data.password, 10);

  const productor = await Usuario.create({
    rolid: 2, // productor
    nombre: data.nombre,
    email: data.email,
    telefono: data.telefono,
    dni: data.dni,
    direccion: data.direccion,
    passwordhash,
    activo: true
  });

  const token = generarToken(productor);
  return { productor, token };
}


//  Login
async function loginUsuario(email, password) {
  const usuario = await usuarioService.obtenerUsuarioPorEmail(email);
  if (!usuario) throw new Error('Credenciales inválidas');

  const valido = await bcrypt.compare(password, usuario.passwordhash);
  if (!valido) throw new Error('Credenciales inválidas');

  const token = generarToken(usuario);
  return { usuario, token };
}

//  Login
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

// 👤 Me
async function obtenerUsuarioAutenticado(usuarioid) {
  const usuario = await Usuario.findByPk(usuarioid, {
    attributes: ['usuarioid', 'nombre', 'email', 'rolid']
  });
  if (!usuario) throw new Error('Usuario no encontrado');
  return usuario;
}
//  Refresh
function renovarToken(usuario) {
  const token = generarToken(usuario);
  return { token };
}

//  Logout
function cerrarSesion() {
  // Si no usás blacklist, esto es simbólico
  return { mensaje: 'Sesión cerrada exitosamente' };
}


module.exports = {
  crearUsuario,
  registrarProductor,
  loginUsuario,
  obtenerUsuarioAutenticado,
  renovarToken,
  cerrarSesion,
  generarToken,
  verificarToken

};
