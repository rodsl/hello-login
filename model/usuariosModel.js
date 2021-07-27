const usuarios = [];

exports.salvar = () =>
  require("fs").writeFileSync("c:/temp/db.json", JSON.stringify(usuarios));
exports.recuperar = () =>
  usuarios.push(...JSON.parse(require("fs").readFileSync("c:/temp/db.json")));

exports.novoUsuario = ({ nome, email, hashed }) => {
  const id = usuarios.length + 1;

  const usuario = {
    id,
    nome,
    email,
    hashed,
  };

  usuarios.push(usuario);

  return usuario;
};

exports.listarTodos = () => usuarios;

exports.buscarPorEmail = (email) =>
  usuarios.find((usuario) => usuario.email === email);
