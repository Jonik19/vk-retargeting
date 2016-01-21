'use strict';

var config = require('config');
var jwt = require('koa-jwt');

var Response = require('helpers/response');
var User = require('domains/user');
var errors = require('modules/errors/services/errors');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Checks user authorization. If user is authorized calls next middleware
 * else throws UnauthorizedError.
 * @param next
 */

controller.onlyAuthenticated = jwt({ secret: config.secrets.authentication });

/**
 * Checks user NOT authorization. If user is not authorized calls next middleware
 * else throws 'ForbiddenError' error.
 * @param next
 */

controller.onlyNotAuthenticated = function *(next) {
  var token = getTokenFromHeader(this.header.authorization);

  try {
    jwt.verify(token, config.secrets.authentication);
  } catch(err) {
    return yield next;
  }

  // If the try block did't throw an error -> user is authorized.
  // Throwing  new ForbiddenError

  throw new errors.ForbiddenError();
};

/**
 * Authorizes user using passed data.
 * If success, then sends user and token to client
 * else throws 'IncorrectDataError' error.
 *
 * @param next Next middlware function or empty function
 */

controller.signIn = function *(next) {
  var data = {
    username: this.request.body.username,
    password: this.request.body.password
  };

  var user = yield User.checkCredentials(data);

  if(user === null) {
    throw new errors.IncorrectDataError();
  }

  var response = new Response(this, generateUserResponse(user, jwt.sign(user, config.secrets.authentication)));
  response.success();
};

/**
 * Creates user using passed data and authorizes it.
 * If success, then sends user and token to client
 * else throws 'SequelizeValidationError' or 'SequelizeUniqueConstraintError' error.
 *
 * @param next Next middlware function or empty function
 */

controller.signUp = function *(next) {
  var data = {
    username: this.request.body.username,
    name: this.request.body.name,
    password: this.request.body.password
  };

  var user = yield User.create(data);

  var response = new Response(this, generateUserResponse(user, jwt.sign(user, config.secrets.authentication)));
  response.success();
};

/**
 * Returns user from db. This route is available if user is authorized only.
 *
 * @param next
 */

controller.check = function *(next) {
  var user = yield User.findById(this.state.user.id);

  var response = new Response(this, { user: user });
  response.success();
};

/**
 * Helper functions definitions:
 */

/**
 * Generates common response for signUp and signIn methods.
 *
 * @param user User object from db
 * @param token JWT token
 * @returns {{user: *, token: *}}
 */

function generateUserResponse(user, token) {
  return {
    user: user,
    token: token
  };
}

/**
 * Returns token from header format('Bearer token123456789')
 * to 'token123456789'.
 *
 * @param {String} header
 * @returns {String}
 */

function getTokenFromHeader(header) {
  if(!/^Bearer\s.+$/.test(header)) {
    return null;
  }

  return header.replace('Bearer ', '');
}

module.exports = controller;