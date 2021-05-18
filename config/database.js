const { Sequelize } = require('sequelize');

module.exports = new Sequelize('one_fork', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});