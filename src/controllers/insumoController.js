// src/controllers/insumoController.js
const InsumoCreateDTO = require('../DTOs/insumos/InsumoCreateDTO');
const InsumoUpdateDTO = require('../DTOs/insumos/InsumoUpdateDTO');
const InsumoResponseDTO = require('../DTOs/insumos/InsumoResponseDTO');
const {
  listarInsumos,
  crearInsumo,
  actualizarInsumo
} = require('../services/insumoService');

async function getInsumos(req, res) {
  try {
    const insumos = await listarInsumos();
    res.json(insumos.map(i => new InsumoResponseDTO(i)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function postInsumo(req, res) {
  try {
    const dto = new InsumoCreateDTO(req.body);
    const nuevo = await crearInsumo(dto);
    res.status(201).json(new InsumoResponseDTO(nuevo));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function putInsumo(req, res) {
  try {
    const dto = new InsumoUpdateDTO(req.body);
    const actualizado = await actualizarInsumo(req.params.id, dto);
    res.json(new InsumoResponseDTO(actualizado));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getInsumos,
  postInsumo,
  putInsumo
};