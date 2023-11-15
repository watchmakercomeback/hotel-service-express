const express = require('express');
const router = express.Router();
const pasajeroService = require('./pasajero.service');

router.get('/pasajero/:pasajeroId', async (req, res) => {
  const pasajeroId = req.params.pasajeroId;
  const pasajero = await pasajeroService.getById(pasajeroId);
  res.json(pasajero);
});

router.post('/pasajero', async (req, res) => {
  const data = req.body;
  const newPasajero = await pasajeroService.create(data);
  res.json(newPasajero);
});

router.put('/pasajero/:pasajeroId', async (req, res) => {
  const pasajeroId = req.params.pasajeroId;
  const data = req.body;
  const updatedPasajero = await pasajeroService.update(pasajeroId, data);
  res.json(updatedPasajero);
});

module.exports = router;