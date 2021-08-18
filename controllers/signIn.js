const { sign } = require("jsonwebtoken");

const signIn = (req, res, next) => {
  const { user, password } = req.body;

  /*
Inserir consulta no banco via sequelize
*/

  const token = sign(
    {
      user,
      password,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: 120 }
  );
  res.json({ token });
};
