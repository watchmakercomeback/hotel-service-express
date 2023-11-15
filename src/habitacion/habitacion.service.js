const Habitacion = require('./habitacion.model'); 
const Reserva = require('../reservas/reservas.model'); 
const { Op } = require('sequelize');

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
  },

  getAvailableHabitaciones: async (req, res) => {
    try {
      const { fechaInicio, fechaFin, personas, ubicacion } = req.body;

      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ error: 'Se requieren fechas de inicio y fin' });
      }

      const tipoHabitacion = determineTipoHabitacion(personas);
      const availableHabitaciones = await Habitacion.findAll({
        where: {
          habilitado: true,
          tipo_habitacion: tipoHabitacion,
          ubicacion: ubicacion || undefined,
        },
        include: [
          {
            model: Reserva,
            where: {
              [Op.or]: [
                {
                  fecha_inicio: {
                    [Op.gte]: new Date(fechaFin),
                  },
                  fecha_fin: {
                    [Op.gte]: new Date(fechaFin),
                  },
                },
                {
                  fecha_inicio: {
                    [Op.lte]: new Date(fechaInicio),
                  },
                  fecha_fin: {
                    [Op.lte]: new Date(fechaInicio),
                  },
                },
              ],
            },
          },
        ],
        having: {
          '$Reservas.id$': null,
        },
      });

      if (availableHabitaciones.length === 0) {
        const message = personas > 1
          ? 'Es posible que necesite más de una habitación.'
          : 'No hay habitaciones disponibles para las fechas y criterios proporcionados.';
        return res.json({ message });
      }

      res.json(availableHabitaciones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener habitaciones disponibles' });
    }
  },
};

function determineTipoHabitacion(personas) {
  if (personas === 1) {
    return 'Individual';
  } else if (personas === 2) {
    return 'Doble';
  } else if (personas >= 3 && personas <= 5) {
    return 'Familiar';
  } else {
    return { [Op.not]: null };
  }
}

module.exports = habitacionService;