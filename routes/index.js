const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuariosController");

router.get("/", function (req, res, next) {
  const { session } = req;
  const estouLogadoCorretamente = !!session.userId;
  res.render("index", { title: "Express", session, estouLogadoCorretamente });
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

  const estouLogadoCorretamente = !!session.userId;
  res.render("index", {
    title: "Express",
    usuario: {
      userId,
      nome,
      email,
      session,
      sessionId: session.id,
      estouLogadoCorretamente,
    },
  });
});

router.use("/logout", function (req, res, next) {
  const { session } = req;
  delete session.userId;

  res.redirect("/");
});

module.exports = router;
