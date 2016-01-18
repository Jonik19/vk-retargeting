'use strict';

var config = require('config');
var jwt = require('koa-jwt');

var User = require('domains/user');

/**
 * Methods definition:
 */

var controller = {};

controller.onlyAuthenticated = jwt({ secret: config.secrets.authentication });

controller.onlyNotAuthenticated = function *(next) {
  try {
    jwt.verify(this.header.authentication, config.secrets.authentication);
  } catch(err) {
    yield next;
  }
};

controller.signIn = function *(next) {
  var data = {
    username: this.request.body.username,
    password: this.request.body.password
  };

  var user = yield User.checkCredentials(data);

  if(user === null) {
    throw {message: 'Incorrect data', status: 400};
  }

  this.body = jwt.sign(user, config.secrets.authentication);
};

controller.signUp = function *(next) {
  var data = {
    username: this.request.body.username,
    name: this.request.body.name,
    password: this.request.body.password
  };

  var user = yield User.create(data);

  this.body = {
    user: user,
    token: jwt.sign(user, config.secrets.authentication)
  };
};

/**
 * Helper functions definition:
 */

function helper() {
  // I do something a little
}

module.exports = controller;