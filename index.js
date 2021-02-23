import express from 'express';
import bodyParser from 'body-parser';
// Realizando uma instância do express em uma constante,
// para evitar sobrescrevê-la
const app = express();

// Definindo pro express que o EJS vai ser utilizado pra renderizar HTML
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Utilizado para pegar os dados enviados pelas requisições do tipo POST
// Decodifica os dados
app.use(bodyParser.urlencoded({ extended: false }));
// Pegando dados enviados em formato de JSON
app.use(bodyParser.json());

// Rota do tipo GET e seu caminho, recebendo request e response como params
app.get('/', (req, res) => {
  // Renderizando algo na tela utilizando o EJS
  res.render('index');
});

app.get('/ask', (req, res) => {
  res.render('ask');
});

// Rota POST para receber dados do formulário
app.post('/save_question', (req, res) => {
  // req.body.title pega os dados enviados pelo input com name="title"
  // O body é disponibilizado pelo bodyParser
  var title = req.body.title;
  var description = req.body.description;
  res.send(
    'Formulário recebido! Título: ' + title + ' | Descrição: ' + description,
  );
});

app.listen(5500, (error) => {
  if (error) console.log('Ocorreu um erro');
  else console.log('Servidor iniciado');
});
