const Joi = require('joi');

const usuarioCultivoSchema = Joi.object({
  usuarioid: Joi.number().integer().required(),
  cultivoid: Joi.number().integer().required(),
  latitud: Joi.number().precision(8).allow(null),
  longitud: Joi.number().precision(8).allow(null),
  fechasiembra: Joi.date().allow(null),
  observaciones: Joi.string().allow('', null)
});

module.exports = { usuarioCultivoSchema };
