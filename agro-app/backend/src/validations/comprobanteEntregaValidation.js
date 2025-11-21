const Joi = require('joi');

const comprobanteSchema = Joi.object({
  solicitudid: Joi.number().integer().required(),
  fecha_entrega: Joi.date().iso().required(),
  entregado_por: Joi.number().integer().required(),
  recibido_por: Joi.number().integer().required(),
  observaciones: Joi.string().allow('', null)
});


module.exports = { comprobanteSchema };