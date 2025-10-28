
const express = require('express');
const router = express.Router();
const {
  postSolicitud,
  getSolicitudesPorUsuario
} = require('../controllers/solicitudController');

router.post('/', postSolicitud);
router.get('/usuario/:usuarioid', getSolicitudesPorUsuario);

module.exports = router;