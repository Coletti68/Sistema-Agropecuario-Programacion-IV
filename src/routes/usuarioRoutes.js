
const express = require('express');
const router = express.Router();
const {
  getUsuarios,
  postUsuario,
  getUsuarioPorId
} = require('../controllers/usuarioController');

router.get('/', getUsuarios);
router.post('/', postUsuario);
router.get('/:id', getUsuarioPorId);

module.exports = router;