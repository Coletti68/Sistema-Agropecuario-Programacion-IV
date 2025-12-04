const Joi = require('joi');

const usuarioCultivoSchema = Joi.object({
  usuarioid: Joi.number().integer().required(),
  cultivoid: Joi.number().integer().required(),
  latitud: Joi.number().required(),
  longitud: Joi.number().required()
});

module.exports = { usuarioCultivoSchema };