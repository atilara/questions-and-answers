const sequelize = require('sequelize');

// Nome do SCHEMA, user, password, host
const connection = new sequelize('questions_answers', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connection;
