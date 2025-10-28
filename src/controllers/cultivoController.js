// src/controllers/cultivoController.js
const CultivoCreateDTO = require('../DTOs/cultivo/CultivoCreateDTO');
const CultivoResponseDTO = require('../DTOs/cultivo/CultivoResponseDTO');
const {
  listarCultivos,
  crearCultivo,
  actualizarCultivo,
  eliminarCultivo
} = require('../services/cultivoService');

async function getCultivos(req, res) {
  try {
    const cultivos = await listarCultivos();
    res.json(cultivos.map(c => new CultivoResponseDTO(c)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function postCultivo(req, res) {
  try {
    const dto = new CultivoCreateDTO(req.body);
    const nuevo = await crearCultivo(dto);
    res.status(201).json(new CultivoResponseDTO(nuevo));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function putCultivo(req, res) {
  try {
    const dto = new CultivoCreateDTO(req.body);
    const actualizado = await actualizarCultivo(req.params.id, dto);
    res.json(new CultivoResponseDTO(actualizado));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteCultivo(req, res) {
  try {
    await eliminarCultivo(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  getCultivos,
  postCultivo,
  putCultivo,
  deleteCultivo
};