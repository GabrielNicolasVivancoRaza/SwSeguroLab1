const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

// GET all reservas
router.get('/', reservasController.getReservas);

// GET reserva by ID
router.get('/:id', reservasController.getReservaById);

// POST create new reserva
router.post('/', reservasController.createReserva);

// PUT update reserva
router.put('/:id', reservasController.updateReserva);

module.exports = router;
