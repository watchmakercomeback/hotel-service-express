const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const Hotel = require('../hotel/hotel.model');

const Habitacion = sequelize.define('Habitacion', {
  habitacion_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo_habitacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  costo_base: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  impuestos: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.STRING,
  },
  habilitado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Habitacion.belongsTo(Hotel, { foreignKey: 'hotel_id' });

module.exports = Habitacion;