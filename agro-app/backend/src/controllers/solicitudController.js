const solicitudService = require('../services/solicitudService');

// Crear solicitud
const crearSolicitud = async (req, res, next) => {
  try {
    const usuarioId = req.params.id; // <- viene del params !!
    const { detalle } = req.body;

    if (!usuarioId) {
      return res.status(400).json({ error: "El usuarioId es obligatorio" });
    }

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


// Listar todas las solicitudes
const listarSolicitudes = async (req, res, next) => {
  try {
    const solicitudes = await solicitudService.listarSolicitudes();
    res.status(200).json(solicitudes);
  } catch (err) {
    console.error('Error en listarSolicitudes:', err);
    res.status(500).json({ error: 'Error al listar solicitudes' });
  }
};

// Listar solicitudes por usuario
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

// Obtener solicitud por ID
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

// Cancelar solicitud
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

// Cambiar estado
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

// Listar con detalles
const listarSolicitudesConDetalles = async (req, res, next) => {
  try {
    const solicitudes = await solicitudService.listarSolicitudesConDetalles();
    res.status(200).json(solicitudes);
  } catch (err) {
    console.error('Error en listarSolicitudesConDetalles:', err);
    res.status(500).json({ error: 'Error al listar solicitudes con detalles' });
  }
};

// Listar por estado
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
