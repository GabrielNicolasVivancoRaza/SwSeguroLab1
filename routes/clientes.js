const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// GET all clientes
router.get('/', clientesController.getClientes);

// GET cliente by ID
router.get('/:id', clientesController.getClienteById);

// POST create new cliente
router.post('/', clientesController.createCliente);

// PUT update cliente
router.put('/:id', clientesController.updateCliente);

module.exports = router;
