const express = require('express');
const hotelRoutes = require('./src/hotel/hotel.routes');
const habitacionRoutes = require('./src/habitacion/habitacion.routes');
const reservaRoutes = require('./src/reservas/reservas.routes');

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/api', hotelRoutes);
app.use('/api', habitacionRoutes);
app.use('/api', reservaRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});