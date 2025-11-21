const Joi = require('joi');

const pagoSchema = Joi.object({
  solicitudid: Joi.number().integer().required(),
  usuarioid: Joi.number().integer().required(),
  monto: Joi.number().positive().required(),
  metodo_pago: Joi.string().valid('efectivo', 'transferencia', 'tarjeta').required(),
  observaciones: Joi.string().allow('', null)
});

const pagoParamsSolicitud = Joi.object({
  solicitudId: Joi.number().integer().required()
});

const pagoParamsUsuario = Joi.object({
  usuarioId: Joi.number().integer().required()
});

const pagoParamsPagoId = Joi.object({
  pagoId: Joi.number().integer().required()
});

const pagoEstadoBody = Joi.object({
  estado_pago: Joi.string().valid('pendiente', 'confirmado', 'rechazado').required()
});

module.exports = {
  pagoSchema,
  pagoParamsSolicitud,
  pagoParamsUsuario,
  pagoParamsPagoId,
  pagoEstadoBody
};
