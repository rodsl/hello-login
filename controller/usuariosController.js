const usuariosModel = require("../model/usuariosModel");
const bcryptjs = require("bcryptjs");

exports.cadastrar = ({ nome, email, senha, confirma }) => {
  if (senha !== confirma) {
    throw new Error("As senhas não conferem");
  }

  const hashed = bcryptjs.hashSync(senha);
  return usuariosModel.novoUsuario({ nome, email, hashed });
};

exports.listarTodos = () => usuariosModel.listarTodos();

exports.efetuarLogin = ({ senha, email }) => {
  const usuario = usuariosModel.buscarPorEmail(email);

  if (!usuario) {
    throw new Error('Access denied');
  }

  const { hashed } = usuario;

  const isValid = bcryptjs.compareSync(senha, hashed);

  if (!isValid) {
    throw new Error('Access denied');
  }
  
  const { id, nome } = usuario;
  
  const ret = { id, nome, email };
  
  return ret;
};
