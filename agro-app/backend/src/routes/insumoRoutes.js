
const express = require('express');
const router = express.Router();
const {
  getInsumos,
  postInsumo,
  putInsumo
} = require('../controllers/insumoController');

router.get('/', getInsumos);
router.post('/', postInsumo);
router.put('/:id', putInsumo);

module.exports = router;