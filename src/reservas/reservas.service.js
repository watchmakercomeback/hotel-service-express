const Reserva = require('./reservas.model');
const Habitacion = require('../habitacion/habitacion.model');
const Agente = require('../agente/agente.model'); 
const Pasajero = require('../pasajero/pasajero.model'); 

const reservaService = {
    getAllReservasByAgente: async (req, res) => {
        try {
            const agenteId = req.params.agenteId;
            const reservas = await Reserva.findAll({
                where: { agente_id: agenteId },
                include: [Habitacion, Agente, Pasajero],
            });
            res.json(reservas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener reservas' });
        }
    },

    createReserva: async (req, res) => {
        try {
            const {
                habitacion_id,
                agente_id,
                pasajero_id,
                contacto_emergencia_nombres,
                contacto_emergencia_telefono,
                fecha_inicio,
                fecha_fin,
                estado,
            } = req.body;

            const nuevaReserva = await Reserva.create({
                habitacion_id,
                agente_id,
                pasajero_id,
                contacto_emergencia_nombres,
                contacto_emergencia_telefono,
                fecha_inicio,
                fecha_fin,
                estado,
            });
            const habitacion = await Habitacion.findByPk(habitacion_id);
            console.log("STOP 1", habitacion)
            if (!habitacion || !habitacion.habilitado) {
                return res.status(400).json({ error: 'La habitación no está disponible' });
            }
            if (habitacion) {
                await habitacion.update({ habilitado: false });
            }
            await nuevaReserva.reload({
                include: [Habitacion, Agente, Pasajero],
            });

            res.json(nuevaReserva);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear una nueva reserva' });
        }
    },
};

module.exports = reservaService;