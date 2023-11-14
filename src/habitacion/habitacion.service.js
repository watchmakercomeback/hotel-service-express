const Habitacion = require('./habitacion.model'); 
const Hotel = require('../hotel/hotel.model'); 

const habitacionService = {
  getAllHabitacionesByHotel: async (req, res) => {
    try {
      const hotelId = req.params.hotelId;
      const habitaciones = await Habitacion.findAll({ where: { hotel_id: hotelId } });
      res.json(habitaciones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener habitaciones' });
    }
  },
  asignarHabitaciones: async (req, res) => {
    try {
      const { hotelId, habitaciones } = req.body;

      await Promise.all(habitaciones.map(async (habitacionId) => {
        const habitacion = await Habitacion.findByPk(habitacionId);
        await habitacion.update({ hotelId });
      }));

      res.json({ mensaje: 'Habitaciones asignadas al hotel correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al asignar habitaciones al hotel' });
    }
  },

  createHabitacion: async (req, res) => {
    try {
      const { hotelId, tipoHabitacion, costoBase, impuestos, ubicacion, habilitado } = req.body;
      const nuevaHabitacion = await Habitacion.create({
        hotel_id: hotelId,
        tipo_habitacion: tipoHabitacion,
        costo_base: costoBase,
        impuestos: impuestos,
        ubicacion: ubicacion,
        habilitado: habilitado,
      });
      res.json(nuevaHabitacion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear una nueva habitación' });
    }
  },

  modificarHabitacion: async (req, res) => {
    try {
      const { habitacionId } = req.params;
      const { tipoHabitacion, costoBase, impuestos, ubicacion, habilitado } = req.body;

      const habitacion = await Habitacion.findByPk(habitacionId);
      if (!habitacion) {
        return res.status(404).json({ error: 'Habitación no encontrada' });
      }

      await habitacion.update({
        tipo_habitacion: tipoHabitacion,
        costo_base: costoBase,
        impuestos: impuestos,
        ubicacion: ubicacion,
        habilitado: habilitado,
      });
      res.json({ mensaje: 'Habitación modificada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al modificar la habitación' });
    }
  },

  habilitarDeshabilitarHabitacion: async (req, res) => {
    try {
      const { habitacionId } = req.params;
      const { habilitado } = req.body;

      const habitacion = await Habitacion.findByPk(habitacionId);
      if (!habitacion) {
        return res.status(404).json({ error: 'Habitación no encontrada' });
      }

      await habitacion.update({ habilitado });
      res.json({ mensaje: 'Estado de la habitación modificado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al modificar el estado de la habitación' });
    }
  }

};

module.exports = habitacionService;