const { sequelize } = require('../db/db');
const { DataTypes } = require('sequelize');
const Habitacion = require('../habitacion/habitacion.model');
const Agente = require('../agente/agente.model');
const Pasajero = require('../pasajero/pasajero.model');

const Reserva = sequelize.define('Reserva', {
  reserva_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  habitacion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  agente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pasajero_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contacto_emergencia_nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contacto_emergencia_telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Reserva.belongsTo(Habitacion, { foreignKey: 'habitacion_id' });
Reserva.belongsTo(Agente, { foreignKey: 'agente_id' });
Reserva.belongsTo(Pasajero, { foreignKey: 'pasajero_id' })

module.exports = Reserva;
