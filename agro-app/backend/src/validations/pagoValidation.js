const Joi = require('joi');

const pagoSchema = Joi.object({
  solicitudid: Joi.number().integer().required(),
  metodo: Joi.string().valid('efectivo', 'transferencia', 'tarjeta').required(),
  monto: Joi.number().positive().required(),
  fecha_pago: Joi.date().iso().required(),
  confirmado: Joi.boolean().required()
});

module.exports = { pagoSchema };