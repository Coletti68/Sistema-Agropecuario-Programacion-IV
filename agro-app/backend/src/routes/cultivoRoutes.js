
const express = require('express');
const router = express.Router();
const {
  getCultivos,
  postCultivo,
  putCultivo,
  deleteCultivo
} = require('../controllers/cultivoController');

router.get('/', getCultivos);
router.post('/', postCultivo);
router.put('/:id', putCultivo);
router.delete('/:id', deleteCultivo);

module.exports = router;

