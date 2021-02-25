const sequelize = require('sequelize');
const connection = require('../database');

const answer = connection.define('answer', {
  body: {
    type: sequelize.TEXT,
    allowNull: false,
  },
  // Chave secundária
  id_question: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
});

answer.sync({ force: false });

module.exports = answer;
