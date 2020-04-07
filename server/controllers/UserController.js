const { User }              = require('../models');
const { SignToken, 
        comparePassword 
      }                     = require('../helpers');
const uuid                  = require('uuid/v4');


class UserController {
  static register(req, res, next) {
    const { username, password, email } = req.body;
    const id = uuid();
    User.findOne({ where: { email }})
      .then(user => {
        if(user) throw new Error('User already exists');
        return User.create({ id, username, password, email });
      })
      .then(user => {
        const token = SignToken(user);
        res.status(201).json({ token, username: user.username });
      })
      .catch(err => next(err));
  }

  static login(req, res, next) {
    const { password, email } = req.body;
    User.findOne({ where: email })
      .then(user => {
        if(!user) throw new Error('User not found');
        if(!comparePassword(password, user.password)) throw new Error('Email or Password does not match');
        const token = SignToken(user);
        res.status(200).json({ token, username: user.username});
      })
      .catch(err => next(err));
  }
}

module.exports = UserController