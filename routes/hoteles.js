const express = require('express');
const router = express.Router();
const hotelesController = require('../controllers/hotelesController');

// GET all hoteles
router.get('/', hotelesController.getHoteles);

// GET hotel by ID
router.get('/:id', hotelesController.getHotelById);

// POST create new hotel
router.post('/', hotelesController.createHotel);

// PUT update hotel
router.put('/:id', hotelesController.updateHotel);

module.exports = router;
