const authService = require('../services/authService');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const usuario = await authService.validarCredenciales(email, password);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = authService.generarToken(usuario);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
