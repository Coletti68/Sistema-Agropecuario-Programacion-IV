const Joi = require('joi');

const cultivoSchema = Joi.object({
  nombre: Joi.string().trim().max(100).required(),
  descripcion: Joi.string().trim().allow('', null).optional()
});

module.exports = { cultivoSchema };