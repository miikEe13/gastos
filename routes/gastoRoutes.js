// routes/gastoRoutes.js
const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gastoController');

// Definir las rutas
router.get('/', gastoController.getAllGastos); // Obtener todos los gastos
router.get('/:id', gastoController.getGastoById); // Obtener un gasto por ID
router.post('/', gastoController.createGasto); // Crear un nuevo gasto
router.put('/:id', gastoController.updateGasto); // Actualizar un gasto
router.delete('/:id', gastoController.deleteGasto); // Eliminar un gasto

router.get('/mes/:mes', gastoController.getGastosByMonth); // Obtener gastos por mes
router.get('/resumen/:mes', gastoController.getMonthlySummary); // Obtener resumen mensual

router.post('/bulk', gastoController.createMultipleGastos); // Crear múltiples gastos

module.exports = router;
