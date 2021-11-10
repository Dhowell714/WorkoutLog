const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:16e178946be14ab9abd46a256ad6b0ce@localhost:5432/workout-log-server");

module.exports = sequelize;