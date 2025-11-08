const Joi = require('joi');

const comprobanteSchema = Joi.object({
  solicitudid: Joi.number().integer().required(),
  fecha_entrega: Joi.date().iso().required(),
  entregado_por: Joi.string().trim().max(100).required(),
  recibido_por: Joi.string().trim().max(100).required(),
  observaciones: Joi.string().trim().allow('', null).optional()
});

module.exports = { comprobanteSchema };