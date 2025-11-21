const authService = require('../services/authService');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Faltan datos' });

    const usuario = await authService.validarCredenciales(email.trim(), password.trim());
    if (!usuario) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = authService.generarToken(usuario);
    return res.json({ token });
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

module.exports = {
  login,
  register
};
