const express = require('express');
const router = express.Router();
const hotelService = require('./hotel.service');

router.get('/hoteles', hotelService.getAllHoteles);

router.post('/hoteles', hotelService.createHotel);

router.put('/hoteles/:hotelId', hotelService.modificarHotel);

router.patch('/hoteles/:hotelId/habilitar-deshabilitar', hotelService.habilitarDeshabilitarHotel);

module.exports = router;

module.exports = router;