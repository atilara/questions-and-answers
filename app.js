// Importação do protocolo http
const http = require("http");

// Criando servidor adicionando uma porta
// Função que recebe uma requisição e gera uma resposta
http.createServer((request, response) => {
  response.end("Bem-vindo ao servidor");
}).listen(5500);

console.log("Servidor rodando");