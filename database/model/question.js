const sequelize = require('sequelize');
const connection = require('../database');

// Definindo o model, tabela question, json representa os campos
// nome dos campos e seus tipos, além dos atributos dos campos
const question = connection.define('question', {
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: sequelize.TEXT,
    allowNull: false,
  },
});

// Sincroniza o arquivo com o banco de dados, se a tabela não existir, ela é criada
// Caso ela já exista, ela não será recriada forçadamente
// .then vazio será executado caso a tabela seja criada com sucesso
question.sync({ force: false }).then(() => {});

module.exports = question;
