// src/controllers/solicitudController.js
const SolicitudCreateDTO = require('../DTos/solicitud/SolicitudCreateDTO');
const SolicitudResponseDTO = require('../DTos/solicitud/solicitudResponseDTO');
const {
  crearSolicitud,
  obtenerSolicitudesPorUsuario
} = require('../services/solicitudService');

async function postSolicitud(req, res) {
  try {
    const dto = new SolicitudCreateDTO(req.body);
    const nueva = await crearSolicitud(dto);
    res.status(201).json(new SolicitudResponseDTO(nueva));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getSolicitudesPorUsuario(req, res) {
  try {
    const solicitudes = await obtenerSolicitudesPorUsuario(req.params.usuarioid);
    res.json(solicitudes.map(s => new SolicitudResponseDTO(s)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  postSolicitud,
  getSolicitudesPorUsuario
};