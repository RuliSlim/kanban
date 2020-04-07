const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SignToken = (user) => {
  return jwt.sign({
    iss: 'Server',
    id: user.id,
    iat: new Date().getTime(),
  }, process.env.JWT_SECRET, {expiresIn: '1h'})
};

const decodedToken = (user) => {
  return jwt.verify(token, process.env.JWT_SECRET)
};

const hashPassword = (user) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(user.password, salt)
}

const comparePassword = (password, user) => {
  return bcrypt.compareSync(password, user.password)
}

module.exports = {
  SignToken,
  decodedToken,
  hashPassword,
  comparePassword
}