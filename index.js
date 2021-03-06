const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/database');
// O simples fato de importar o model faz com que o sync seja executado
const question = require('./database/model/question');
const answer = require('./database/model/answer');
// Conexão com a base de dados, tenta logar com o mysql
// then é chamado caso a conexão dê certo
// catch é chamado caso dê erro
connection
  .authenticate()
  .then(() => {
    console.log('Conexão realizada');
  })
  .catch((error) => {
    console.log(error);
  });

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
  // O método findAll pega todas as perguntas da tabela e manda
  // as perguntas para o questions
  // O JSON adicionado ao findAll serve para que o sequelize retorne as perguntas
  // e nada mais. O order é recebe um array que define a regra de ordenação
  question.findAll({ raw: true, order: [['id', 'DESC']] }).then((questions) => {
    // Renderizando o view e passando as perguntas para as telas
    res.render('index', {
      questions: questions,
    });
  });
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
  // Método responsável por fazer inserção de dados no banco, utilizando o
  // model do banco de dados
  question
    .create({
      title: title,
      description: description,
    })
    .then(() => {
      res.redirect('/');
    });
  // Quando a pergunta é criada, o usuário é redirecionado para a home
});

app.get('/question/:id', (req, res) => {
  var id = req.params.id;
  // Método para buscar um dado no banco com uma condição
  // SELECT questions WHERE id = minhaVariavelId
  question.findOne({ where: { id: id } }).then((question) => {
    // Se a pergunta for encontrada ele renderiza a tela da pergunta
    if (question != undefined) {
      // Retorna todas as respostas que sejam relacionadas a pergunta que está aberta
      answer
        .findAll({
          where: { id_question: question.id },
          order: [['id', 'DESC']],
        })
        .then((answers) => {
          res.render('question', {
            // Passando as variáveis
            question: question,
            answers: answers,
          });
        });
    } else {
      res.redirect('/');
    }
  });
});

app.post('/reply', (req, res) => {
  var body = req.body.body;
  var questionId = req.body.question;
  answer
    .create({
      body: body,
      id_question: questionId,
    })
    .then(() => {
      // Usuário é redirecionado para a página da pergunta que ele respondeu
      res.redirect('/question/' + questionId);
    });
});

app.listen(5500, (error) => {
  if (error) console.log('Ocorreu um erro');
  else console.log('Servidor iniciado');
});
