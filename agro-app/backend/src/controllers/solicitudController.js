const solicitudService = require('../services/solicitudService');

const crearSolicitud = async (req, res, next) => {
  try {
    const usuarioId = req.body.usuarioid;
    const { detalle } = req.body;

    if (!usuarioId) {
      return res.status(400).json({ error: "El usuarioId es obligatorio" });
    }
    console.log(detalle)
    console.log(req.body);
    if (!detalle || !Array.isArray(detalle) || detalle.length === 0) {
      return res.status(400).json({ error: "El detalle de la solicitud está vacío o mal formado" });
    }

    const nuevaSolicitud = await solicitudService.crearSolicitud(usuarioId, detalle);
    res.status(201).json(nuevaSolicitud);
  } catch (err) {
    console.error('Error en crearSolicitud:', err);
    res.status(500).json({ error: 'Error al crear solicitud', detalle: err.message });
  }
};

const listarSolicitudes = async (req, res, next) => {
  try {
    const solicitudes = await solicitudService.listarSolicitudes();
    res.status(200).json(solicitudes);
  } catch (err) {
    console.error('Error en listarSolicitudes:', err);
    res.status(500).json({ error: 'Error al listar solicitudes' });
  }
};

const listarSolicitudesPorUsuario = async (req, res, next) => {
  try {
    const usuarioId = req.params.id;
    if (!usuarioId) return res.status(400).json({ error: 'UsuarioId es obligatorio' });

    const solicitudes = await solicitudService.listarSolicitudesPorUsuario(usuarioId);
    res.status(200).json(solicitudes);
  } catch (err) {
    console.error('Error en listarSolicitudesPorUsuario:', err);
    res.status(500).json({ error: 'Error al listar solicitudes por usuario' });
  }
};

const obtenerSolicitudPorId = async (req, res, next) => {
  try {
    const solicitudId = req.params.id;
    if (!solicitudId) return res.status(400).json({ error: 'SolicitudId es obligatorio' });

    const solicitud = await solicitudService.obtenerSolicitudPorId(solicitudId);
    res.status(200).json(solicitud);
  } catch (err) {
    console.error('Error en obtenerSolicitudPorId:', err);
    res.status(500).json({ error: 'Error al obtener solicitud' });
  }
};

const cancelarSolicitud = async (req, res, next) => {
  try {
    const solicitudId = req.params.id;
    if (!solicitudId) return res.status(400).json({ error: 'SolicitudId es obligatorio' });

    const resultado = await solicitudService.cancelarSolicitud(solicitudId);
    res.status(200).json(resultado);
  } catch (err) {
    console.error('Error en cancelarSolicitud:', err);
    res.status(500).json({ error: 'Error al cancelar solicitud' });
  }
};

const cambiarEstadoSolicitud = async (req, res, next) => {
  try {
    const solicitudId = req.params.id;
    const { estadoId, usuarioId } = req.body;

    if (!solicitudId || !estadoId || !usuarioId) {
      return res.status(400).json({ error: 'SolicitudId, estadoId y usuarioId son obligatorios' });
    }

    const resultado = await solicitudService.cambiarEstadoSolicitud(solicitudId, estadoId, usuarioId);
    res.status(200).json(resultado);
  } catch (err) {
    console.error('Error en cambiarEstadoSolicitud:', err);
    res.status(500).json({ error: 'Error al cambiar estado de la solicitud' });
  }
};

const listarSolicitudesConDetalles = async (req, res, next) => {
  try {
    const solicitudes = await solicitudService.listarSolicitudesConDetalles();
    res.status(200).json(solicitudes);
  } catch (err) {
    console.error('Error en listarSolicitudesConDetalles:', err);
    res.status(500).json({ error: 'Error al listar solicitudes con detalles' });
  }
};

const listarSolicitudesPorEstado = async (req, res, next) => {
  try {
    const estadoId = req.params.estadoId;
    if (!estadoId) return res.status(400).json({ error: 'EstadoId es obligatorio' });

    const solicitudes = await solicitudService.listarSolicitudesPorEstado(estadoId);
    res.status(200).json(solicitudes);
  } catch (err) {
    console.error('Error en listarSolicitudesPorEstado:', err);
    res.status(500).json({ error: 'Error al listar solicitudes por estado' });
  }
};

module.exports = {
  crearSolicitud,
  listarSolicitudes,
  listarSolicitudesPorUsuario,
  obtenerSolicitudPorId,
  cancelarSolicitud,
  cambiarEstadoSolicitud,
  listarSolicitudesConDetalles,
  listarSolicitudesPorEstado
};
