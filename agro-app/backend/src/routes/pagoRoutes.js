
const express = require('express');
const router = express.Router();
const {
  postPago,
  getPagosPorSolicitud
} = require('../controllers/pagoController');

router.post('/', postPago);
router.get('/solicitud/:solicitudid', getPagosPorSolicitud);

module.exports = router;