const Joi = require('joi');

const proveedorSchema = Joi.object({
  nombre: Joi.string().trim().max(100).required(),
  contacto: Joi.string().trim().max(100).optional(),
  telefono: Joi.string().trim().max(20).optional(),
  direccion: Joi.string().trim().max(200).optional()
});

module.exports = { proveedorSchema };