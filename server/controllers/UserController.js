const { User }              = require('../models');
const { SignToken, 
        comparePassword 
      }                     = require('../helpers');
const uuid                  = require('uuid/v4');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


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
        res.status(201).json({ access_token: token, username: user.username });
      })
      .catch(err => next(err));
  }

  static login(req, res, next) {
    const { password, email } = req.body;
    User.findOne({ where: { email } })
      .then(user => {
        if(!user) throw new Error('User not found');
        if(!comparePassword(password, user)) throw new Error('Email or Password does not match');
        const token = SignToken(user);
        res.status(200).json({ access_token: token, username: user.username});
      })
      .catch(err => next(err));
  }

  static google(req, res, next) {
    console.log(req.body);
    console.log('masuk')
    const token = req.body.token;
    const password = 'password';
    let email, username;
    client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        console.log('masuk ticket')
        const payload = ticket.getPayload();
        email = payload['email'];
        username = payload['given_name'];
        return User.findOne({ where: {email}});
      })
      .then(user => {
        console.log('masuk user find')
        if(user && user.username == username) {
          return user
        } else {
          return User.create({
            id: uuid(),
            username,
            email,
            password
          });
        }
      })
      .then(user => {
        console.log('masuk final')
        const token = SignToken(user);
        res.status(200).json({ access_token: token, username: user.username});
      })
      .catch(err => next(err));
  }
}

module.exports = UserController