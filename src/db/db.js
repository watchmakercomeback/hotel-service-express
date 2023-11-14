const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root' ,
  password: 'Pass123' ,
  database: 'hoteldb',
  port: 3306
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

module.exports = { sequelize };