const Joi = require('joi');

const insumoSchema = Joi.object({
  nombre: Joi.string().required(),
  descripcion: Joi.string().allow(''),
  precio: Joi.number().required(),        
  proveedorid: Joi.number().integer().required(),
  stock: Joi.number().integer().required(), 
  stock_minimo: Joi.number().integer()
});

module.exports = { insumoSchema };