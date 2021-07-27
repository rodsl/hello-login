const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuariosController");
const usuariosModel = require("../model/usuariosModel");

router.get("/", function (req, res, next) {
  const { session } = req;
  const todosOsUsuariosCadastrados = usuariosController.listarTodos();
  const estouLogadoCorretamente = !!session.userId;
  const { id: sessionId } = session;
  res.render("index", {
    title: "Express - Rodrigo Lima",
    session,
    sessionId,
    estouLogadoCorretamente,
    todosOsUsuariosCadastrados,
  });
});

// http://localhost:3000/api/login?email=exemplo@contoso.com&senha=12345678

usuariosController.cadastrar({
  nome: 'nome',
  email: 'exemplo@contoso.com',
  senha: '12345678',
  confirma: '12345678',
});

router.post("/", function (req, res, next) {
  const { nome, email, senha, confirma } = req.body;

  const { id: userId } = usuariosController.cadastrar({
    nome,
    email,
    senha,
    confirma,
  });

  const { session } = req;
  session.userId = userId;

  res.redirect("/");
});

router.post("/login", function (req, res, next) {
  const { email, senha } = req.body;
  const { id: userId } = usuariosController.efetuarLogin({ email, senha });
  req.session.userId = userId;
  res.redirect("/");
});

router.get("/api/login", function (req, res, next) {
  const { email, senha } = req.query;
  const { id: userId } = usuariosController.efetuarLogin({ email, senha });
  
  res.json({ userId });
});

const { log } = console;

var jwt = require('jsonwebtoken');


if (process.argv.length === 5) {
  const [node, script, command] = process.argv;
  
  usuariosModel.recuperar();

  if (command === 'cadastrar') {
    const email = process.argv[3];
    const senha = process.argv[4];

    try {
      usuariosController.cadastrar({
        nome: email,
        email,
        senha,
        confirma: senha,
      });
      usuariosModel.salvar();
      
      log(`Você se cadastrou com sucesso`);
    } catch(error){
      log(error.message);
      process.exit(1);
    }

    process.exit(0);
  }


  if (command === 'login') {
    const email = process.argv[3];
    const senha = process.argv[4];

    try {
      const { id: userId } = usuariosController.efetuarLogin({ email, senha });
      var token = jwt.sign({ userId }, '12345678');
      log(`Você se logou como ${userId}, seu token: ${token}`);
    } catch(error){
      log(error.message);
      process.exit(1);
    }

    process.exit(0);
  }

  if (command === 'buscar') {
    const token = process.argv[3];    
    const email = process.argv[4];

    try {
      const token = jwt.verify(token, '12345678');
      const { userId } = token;
      log(`Você se logou como ${userId}, seu token: ${token}`);

      usuariosModel.buscarPorEmail({ email });      
    } catch(error){
      log(error.message);
      process.exit(1);
    }

    process.exit(0);
  }  
}


router.post("/logout", function (req, res, next) {
  const { session } = req;
  delete session.userId;

  res.redirect("/");
});

module.exports = router;
