const Joi = require('joi');

const usuarioSchema = Joi.object({
  rolid: Joi.number().integer().required(),
  nombre: Joi.string().trim().max(100).required(),
  email: Joi.string().email().required(),
  telefono: Joi.string().trim().max(20).optional(),
  dni: Joi.string().trim().max(20).required(),
  direccion: Joi.string().trim().max(200).optional(),
  passwordhash: Joi.string().required()
});

module.exports = { usuarioSchema };