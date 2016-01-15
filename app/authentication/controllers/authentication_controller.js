'use strict';

var config = require('config');
var jwt = require('koa-jwt');

var User = require('../../domains/user');

module.exports = {
  onlyAuthenticated: jwt({ secret: config.secrets.authentication }),
  signOut: signOut,
  signIn: signIn
};

function *signOut() {
  this.body = 'Sign Out'
}

function *signIn(next) {
  User.create({}).then(function (user) {
    console.log(user);
  });

  yield next;
}