const express = require('express');
const router = express.Router();
const habitacionService = require('./habitacion.service');

router.get('/habitaciones/:hotelId/habitaciones', habitacionService.getAllHabitacionesByHotel);

router.post('/hoteles/:hotelId/habitaciones/asignar-habitaciones', habitacionService.asignarHabitaciones);

router.post('/hoteles/:hotelId/habitaciones', habitacionService.createHabitacion);

router.put('/hoteles/:hotelId/habitaciones/:habitacionId', habitacionService.modificarHabitacion);

router.patch('/hoteles/:hotelId/habitaciones/:habitacionId/habilitar-deshabilitar', habitacionService.habilitarDeshabilitarHabitacion);

router.post('/habitaciones/habitaciones-disponibles', habitacionService.getAvailableHabitaciones);

module.exports = router;