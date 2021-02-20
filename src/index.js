import express from 'express';

// Realizando uma instância do express em uma constante,
// para evitar sobrescrevê-la
const app = express();

// Rota do tipo GET e seu caminho, recebendo request e response como params
app.get('/', (req, res) => {
  // Enviando resposta para a rota
  res.send('Olá!');
});

// Testando a utilização de parâmetros
app.get('/:name', (req, res) => {
  // Utilizando req para pegar o valor do parâmetro
  const name = req.params.name;
  // Enviando resposta para a rota
  res.send('Olá ' + name + '!');
});

app.listen(5500, (error) => {
  if (error) console.log('Ocorreu um erro');
  else console.log('Servidor iniciado');
});
