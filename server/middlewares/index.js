const { decodedToken } = require('../helpers');
const { User, Task }   = require('../models');

const errorHandler = (err, req, res, next) => {
  console.log(err)
  if(err.message.includes('email') || err.message.includes('login') || err.message.includes('exist') || err.name == 'JsonWebTokenError') {
    return res.status(400).json({ message: err.message});
  }
  if(err.message == ('User invalid' || 'You are not authorized')) {
    return res.status(403).json({ message: err.message });
  }
  if(err.name == 'SequelizeValidationError') {
    let msg;
    if(err.errors.length) {
      msg = [];
      err.errors.forEach(el => {
        msg.push(el.message);
      })
      return res.status(400).json({ message: msg });
    } else {
      return res.status(400).json({ message: err.error.message })
    }
  }
  if(err.name == 'Error') {
    return res.status(404).json({ message: err.message })
  } else {
    return res.status(500).json({ message: 'Internal Server Error'})
  }
}

const authentication = (req, res, next) => {
  const token = req.headers.access_token;
  if(!token) throw new Error('You have to login');
  if(!decodedToken(token)) throw new Error('Invalid token');
  const {id} = decodedToken(token);
  User.findOne({ where: { id } })
    .then(user => {
      if(!user) throw new Error('User invalid');
      req.user = user;
      next();
    })
    .catch(err => next(err));
}

const authorization = (req, res, next) => {
  const user = req.user;
  Task.findOne({ where: {
    id: req.params.id
  }})
    .then(task => {
      if(!task) throw new Error('Task not found');
      if(task.UserId != user.id) throw new Error('You are not authorized');
      next();
    })
    .catch(err => next(err));
}

module.exports = {
  errorHandler,
  authentication,
  authorization
}
