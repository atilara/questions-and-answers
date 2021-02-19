import express from 'express';

// Realizando uma instância do express em uma constante,
// para evitar sobrescrevê-la
const app = express();

app.listen(5500, (err) => {
  if (err) console.log('Ocorreu um erro');
  else console.log('Servidor iniciado');
});
