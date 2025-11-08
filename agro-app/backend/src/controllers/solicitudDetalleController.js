
const solicituddetalleService = require ('../services/solicitudDetalleService');

const agregarDetalle = async (req, res, next) => {
  try {
    const { insumoid, cantidad, preciounitario } = req.validatedBody;
    const detalle = await solicitudDetalleService.agregarDetalle(req.validated.params.solicitudId, insumoid, cantidad, preciounitario);
    res.status(201).json(detalle);
  } catch (err) {
    next(err);
  }
};


const listarDetallesPorSolicitud = async (req,res,next) => {
    try {
        const listarDetallesPorSoli = await solicituddetalleService.listarDetallesPorSolicitud(req.validated.params.solicitudId);
        res.status(200).json(listarDetallesPorSoli);
    } catch (err) {
        next(err);
    }
    
};

const obtenerDetallePorId = async (req,res,next) => {
    try {
        const obtenerDetalle = await solicituddetalleService.obtenerDetallePorId(req.validated.params.detalleId);
        res.status(200).json(obtenerDetalle);
    } catch (err) {
        next(err);
    }
};

const actualizarCantidad = async (req,res,next) => {
    try {
        const actualizar = await solicituddetalleService.actualizarCantidad(req.validated.params.detalleId, cantidad);
        res.status(200).json(actualizar)
    } catch (err) {
        next(err);
    }
    
};

const actualizarPrecio = async (req,res,next) => {
    try {
        const actualizarPrecio = await solicituddetalleService.actualizarPrecio(req.validated.params.detalleId.preciounitario);
        res.status(200).json(actualizarPrecio); 
    } catch (err) {
        next(err);
    }  
};

const eliminarDetalle = async (req,res,next) => {
    try {
        const eliminar = await solicituddetalleService.eliminarDetalle(req.validated.params.detalleId);
        res.status(200).json(eliminarDetalle);
    } catch (err) {
        next(err);
    }  
};

module.exports = {
  agregarDetalle,
  listarDetallesPorSolicitud,
  obtenerDetallePorId,
  actualizarCantidad,
  actualizarPrecio,
  eliminarDetalle
};