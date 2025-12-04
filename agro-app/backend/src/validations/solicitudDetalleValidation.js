const Joi = require('joi');

const detalleSchema = Joi.object({
  insumoid: Joi.number().integer().required(),
  cantidad: Joi.number().positive().required(),
  preciounitario: Joi.number().positive().required()
});

module.exports = { detalleSchema };