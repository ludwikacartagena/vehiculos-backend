const express = require('express');
const router = express.Router();
const registrosController = require('../controllers/registrosController');

// Rutas para registros
router.get('/', registrosController.obtenerRegistros);
router.get('/:id', registrosController.obtenerRegistroPorId);
router.post('/', registrosController.crearRegistro);
router.put('/:id', registrosController.actualizarRegistro);
router.delete('/:id', registrosController.eliminarRegistro);

module.exports = router;