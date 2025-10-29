
const express = require('express');
const router = express.Router();
const {
  postComprobante,
  getComprobantesPorSolicitud
} = require('../controllers/comprobanteController');

router.post('/', postComprobante);
router.get('/solicitud/:solicitudid', getComprobantesPorSolicitud);

module.exports = router;