const { sequelize } = require('../db/db');
const { DataTypes } = require('sequelize');

const Agente = sequelize.define('Agente', {
    agente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
});

module.exports = Agente;