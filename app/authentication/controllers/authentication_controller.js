'use strict';

var config = require('config');
var jwt = require('koa-jwt');

var User = require('../../domains/user');

module.exports = {
  onlyAuthenticated: jwt({ secret: config.secrets.authentication }),
  onlyNotAuthenticated: onlyNotAuthenticated,
  signOut: signOut,
  signUp: signUp,
  signIn: signIn
};

function *signIn() {
  var data = {};

  data.username = this.request.query.username;
  data.password = this.request.query.password;

  // If exist in db, generate token and return it

  var user = yield User.checkCredentials(data.username, data.password);

  if(user === null) {
    throw {message: 'Incorrect data', status: 400};
  }

  this.body = jwt.sign(user, config.secrets.authentication);
}

function *signUp(next) {
  console.log('signUp');
  var data = {};

  data.username = this.request.query.username;
  data.password = this.request.query.password;

  var user = yield User.create(data);

  this.body = {
    user: user,
    token: jwt.sign(user, config.secrets.authentication)
  };
}

function *signOut(next) {
  this.body = 'Sign out';

  yield next;
}

function *onlyNotAuthenticated(next) {
  try {
    jwt.verify(this.header.authentication, config.secrets.authentication);
  } catch(err) {
    yield next;
  }
}