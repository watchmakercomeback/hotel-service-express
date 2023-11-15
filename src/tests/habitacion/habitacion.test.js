const Habitacion = require('../../habitacion/habitacion.model');
const Reserva = require('../../reservas/reservas.model');
const habitacionService = require('../../habitacion/habitacion.service');

// Mocking dependencies
jest.mock('../../habitacion/habitacion.model');
jest.mock('../../reservas/reservas.model');

describe('habitacionService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllHabitacionesByHotel', () => {
    it('should get all habitaciones for a hotel', async () => {
      const req = { params: { hotelId: 1 } };
      const res = { json: jest.fn() };

      Habitacion.findAll.mockResolvedValue([{ habitacion_id: 1, tipo_habitacion: 'individual' }]);

      await habitacionService.getAllHabitacionesByHotel(req, res);

      expect(Habitacion.findAll).toHaveBeenCalledWith({ where: { hotel_id: 1 } });
      expect(res.json).toHaveBeenCalledWith([{ habitacion_id: 1, tipo_habitacion: 'individual' }]);
    });

    it('should handle errors', async () => {
      const req = { params: { hotelId: 1 } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      Habitacion.findAll.mockRejectedValue(new Error('Database error'));

      await habitacionService.getAllHabitacionesByHotel(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener habitaciones' });
    });
  });

  describe('asignarHabitaciones', () => {
    it('should assign habitaciones to a hotel', async () => {
      const req = { body: { hotelId: 1, habitaciones: [1, 2, 3] } };
      const res = { json: jest.fn() };

      Habitacion.findByPk.mockResolvedValueOnce({ update: jest.fn() });

      await habitacionService.asignarHabitaciones(req, res);

      expect(Habitacion.findByPk).toHaveBeenCalledTimes(3);
      expect(Habitacion.update).toHaveBeenCalledTimes(3);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Habitaciones asignadas al hotel correctamente' });
    });

    it('should handle errors', async () => {
      const req = { body: { hotelId: 1, habitaciones: [1, 2, 3] } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      Habitacion.findByPk.mockRejectedValue(new Error('Database error'));

      await habitacionService.asignarHabitaciones(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al asignar habitaciones al hotel' });
    });
  });

  // Add similar tests for createHabitacion, modificarHabitacion, and habilitarDeshabilitarHabitacion functions

  describe('getAvailableHabitaciones', () => {
    it('should get available habitaciones based on criteria', async () => {
      const req = {
        body: { fechaInicio: '2023-01-01', fechaFin: '2023-01-10', personas: 2, ubicacion: 'centro' },
      };
      const res = { json: jest.fn() };

      Habitacion.findAll.mockResolvedValueOnce([
        { habitacion_id: 1, tipo_habitacion: 'doble', ubicacion: 'centro' },
      ]);
      Reserva.findAll.mockResolvedValueOnce([]);

      await habitacionService.getAvailableHabitaciones(req, res);

      expect(Habitacion.findAll).toHaveBeenCalled();
      expect(Reserva.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([
        { habitacion_id: 1, tipo_habitacion: 'doble', ubicacion: 'centro' },
      ]);
    });

    it('should handle errors', async () => {
      const req = {
        body: { fechaInicio: '2023-01-01', fechaFin: '2023-01-10', personas: 2, ubicacion: 'centro' },
      };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

      Habitacion.findAll.mockRejectedValue(new Error('Database error'));

      await habitacionService.getAvailableHabitaciones(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener habitaciones disponibles' });
    });
  });
});
