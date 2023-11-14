const { sequelize } = require('../db/db');
const { DataTypes } = require('sequelize');

const Hotel = sequelize.define('Hotel', {
  hotel_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
  },
  comision: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  habilitado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Hotel;