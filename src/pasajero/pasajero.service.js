const Pasajero = require('./pasajero.model');

const pasajeroService = {
  getById: async (id) => {
    try {
      const pasajero = await Pasajero.findByPk(id);
      if (!pasajero) {
        throw new Error('Pasajero not found');
      }
      return pasajero;
    } catch (error) {
      throw new Error(`Error getting pasajero: ${error.message}`);
    }
  },

  create: async (data) => {
    try {
      const pasajero = await Pasajero.create(data);
      return pasajero;
    } catch (error) {
      throw new Error(`Error creating pasajero: ${error.message}`);
    }
  },

  update: async (id, data) => {
    try {
      const pasajero = await Pasajero.findByPk(id);
      if (!pasajero) {
        throw new Error('Pasajero not found');
      }
      // Add input validations here if needed
      return await pasajero.update(data);
    } catch (error) {
      throw new Error(`Error updating pasajero: ${error.message}`);
    }
  },
};

module.exports = pasajeroService;