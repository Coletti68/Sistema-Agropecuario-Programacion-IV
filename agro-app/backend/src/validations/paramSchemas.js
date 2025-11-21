const Joi = require('joi');

// Genérico para cualquier :id
const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});

// Específicos para cada entidad
const usuarioIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required()
});


const cultivoIdParamSchema = Joi.object({
  cultivoId: Joi.number().integer().positive().required()
});

const solicitudIdParamSchema = Joi.object({
  solicitudId: Joi.number().integer().positive().required()
});

const detalleIdParamSchema = Joi.object({
  detalleId: Joi.number().integer().positive().required()
});

const proveedorIdParamSchema = Joi.object({
  proveedorId: Joi.number().integer().positive().required()
});

const pagoIdParamSchema = Joi.object({
  pagoId: Joi.number().integer().positive().required()
});

const insumoIdParamSchema = Joi.object({
  insumoId: Joi.number().integer().positive().required()
});

const historialIdParamSchema = Joi.object({
  historialId: Joi.number().integer().positive().required()
});

const usuariocultivoIdParamSchema = Joi.object({
  usuariocultivoId: Joi.number().integer().positive().required()
});

module.exports = {
  idParamSchema,
  usuarioIdParamSchema,
  cultivoIdParamSchema,
  solicitudIdParamSchema,
  detalleIdParamSchema,
  proveedorIdParamSchema,
  pagoIdParamSchema,
  insumoIdParamSchema,
  historialIdParamSchema,
  usuariocultivoIdParamSchema
};