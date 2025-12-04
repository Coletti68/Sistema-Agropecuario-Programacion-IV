const Joi = require('joi');

const cambioCultivoSchema = Joi.object({
  usuariocultivoid: Joi.number().integer().required(),
  usuarioid: Joi.number().integer().required(),
  latitud: Joi.number().required(),
  longitud: Joi.number().required()
});

module.exports = { cambioCultivoSchema };