const Hotel = require('./hotel.model');
const Habitacion = require('../habitacion/habitacion.model');

const hotelService = {
  getAllHoteles: async (req, res) => {
    try {
      const hoteles = await Hotel.findAll();
      res.json(hoteles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener hoteles' });
    }
  },
  createHotel: async (req, res) => {
    try {
      const { nombre, direccion, comision, habilitado } = req.body;
      const nuevoHotel = await Hotel.create({ nombre, direccion, comision, habilitado });
      res.json(nuevoHotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear un nuevo hotel' });
    }
  },
  modificarHotel: async (req, res) => {
    try {
      const { hotelId } = req.params;
      const { nombre, direccion, comision, habilitado } = req.body;

      const hotel = await Hotel.findByPk(hotelId);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel no encontrado' });
      }

      await hotel.update({ nombre, direccion, comision, habilitado });
      res.json({ mensaje: 'Hotel modificado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al modificar el hotel' });
    }
  },
  habilitarDeshabilitarHotel: async (req, res) => {
    try {
      const { hotelId } = req.params;
      const { habilitado } = req.body;

      const hotel = await Hotel.findByPk(hotelId);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel no encontrado' });
      }

      await hotel.update({ habilitado });
      res.json({ mensaje: 'Estado del hotel modificado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al modificar el estado del hotel' });
    }
  }
};

module.exports = hotelService;