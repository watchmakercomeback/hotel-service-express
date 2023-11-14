const { sequelize } = require('../db/db');
const { DataTypes } = require('sequelize');

const Pasajero = sequelize.define('Pasajero', {
    pasajero_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombres_apellidos: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    genero: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    tipo_documento: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    numero_documento: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    telefono_contacto: {
        type: DataTypes.STRING(20),
    },
});

module.exports = Pasajero;