
const express = require('express');
const router = express.Router();
const {
  getProveedores,
  postProveedor
} = require('../controllers/proveedorController');

router.get('/', getProveedores);
router.post('/', postProveedor);

module.exports = router;