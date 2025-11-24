const authService = require('../services/authService');
const Usuario = require('../models/usuarioModel');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Faltan datos' });

    const usuario = await authService.validarCredenciales(email.trim(), password.trim());
    if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = authService.generarToken(usuario);
    return res.json({
  token,
  usuario: {
    usuarioid: usuario.usuarioid,
    nombre: usuario.nombre,
    email: usuario.email,
    telefono: usuario.telefono,
    direccion: usuario.direccion,
    rol: usuario.rol
  }
});

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error interno' });
  }
}

async function register(req, res) {
  try {
    const nuevoUsuario = await authService.crearUsuario(req.body);
    res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuarioid: nuevoUsuario.usuarioid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function perfil(req, res) {
  try {
    const usuario = await authService.obtenerUsuarioPorId(req.user.usuarioid);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { passwordhash, ...data } = usuario.toJSON();

    res.json(data);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function actualizarPerfil(req, res) {
  try {
    const userId = req.user.usuarioid;
    const { nombre, telefono, direccion } = req.body;

    const user = await Usuario.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.nombre = nombre ?? user.nombre;
    user.telefono = telefono ?? user.telefono;
    user.direccion = direccion ?? user.direccion;

    await user.save();

    res.json({ message: 'Perfil actualizado', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al actualizar perfil' });
  }
}

module.exports = {
  login,
  register,
  perfil,
  actualizarPerfil
};
