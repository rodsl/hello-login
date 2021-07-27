const usuariosController = require('./usuariosController');

describe('teste', () => {
 it('should return jwt token', () => {
  usuariosController.cadastra({senha: '12345678', email: 'fernandobhz@gmail.com'});
  const token = usuariosController.efetuarLogin({senha: '12345678', email: 'fernandobhz@gmail.com'});

  expect(token).toBeString();
 });
});
