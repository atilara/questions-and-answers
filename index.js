import express from 'express';

// Realizando uma instância do express em uma constante,
// para evitar sobrescrevê-la
const app = express();

// Definindo pro express que o EJS vai ser utilizado pra renderizar HTML
app.set('view engine', 'ejs');

// Rota do tipo GET e seu caminho, recebendo request e response como params
app.get('/:name', (req, res) => {
  const name = req.params.name;
  // Renderizando algo na tela utilizando o EJS
  res.render('index.ejs', {
    name: name,
  });
});

app.listen(5500, (error) => {
  if (error) console.log('Ocorreu um erro');
  else console.log('Servidor iniciado');
});
