const Joi = require('joi');

const insumoSchema = Joi.object({
  nombre: Joi.string().trim().max(100).required(),
  descripcion: Joi.string().trim().allow('', null).optional(),
  precio_unitario: Joi.number().positive().required(),
  stock_actual: Joi.number().integer().min(0).required(),
  proveedorid: Joi.number().integer().required()
});

module.exports = { insumoSchema };