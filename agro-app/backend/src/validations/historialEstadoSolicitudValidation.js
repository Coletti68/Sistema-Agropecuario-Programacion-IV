const Joi = require('joi');

const cambioEstadoSchema = Joi.object({
  solicitudid: Joi.number().integer().required(),
  estadosolicitudid: Joi.number().integer().required(),
  usuarioid: Joi.number().integer().required()
});

module.exports = { cambioEstadoSchema };