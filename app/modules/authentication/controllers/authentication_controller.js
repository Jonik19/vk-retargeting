'use strict';

var config = require('config');
var jwt = require('koa-jwt');

var response = require('helpers/response');
var UserRepo = require('repositories/user');
var errors = require('modules/errors/services/errors');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Checks user authorization. If user is authorized calls next middleware and writes current user model instance
 * to the this.state.user property otherwise throws UnauthorizedError.
 *
 * @param next
 */

controller.onlyAuthenticated = jwt({ secret: config.authentication.secrets.sign });

/**
 * Checks user NOT authorization. If user is not authorized calls next middleware
 * else throws 'ForbiddenError' error.
 * @param next
 */

controller.onlyNotAuthenticated = function *(next) {
  var token = getTokenFromHeader(this.header.authorization);

  try {
    jwt.verify(token, config.authentication.secrets.sign);
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

  var user = yield UserRepo.checkCredentials(data);

  if(user === null) {
    throw new errors.IncorrectDataError();
  }

  response.success(this, generateUserResponse(user, sign(user)));
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

  var user = yield UserRepo.create(data);

  response.success(this, generateUserResponse(user, sign(user)));
};

/**
 * Returns user from db and newly generated token. This route is available if user is authorized only.
 *
 * @param next
 */

controller.check = function *(next) {
  var user = yield UserRepo.findById(this.state.user.id);

  response.success(this, generateUserResponse(user, sign(user)));
};

/**
 * Helper functions definitions:
 */

/**
 * Signs passed user and returns authentication token.
 * You can use this token to pass authentication in future.
 *
 * @param user User object to encode
 * @returns {String} Token
 */

function sign(user) {
  return jwt.sign(user, config.authentication.secrets.sign, {
    expiresInSeconds: config.authentication.tokenExpiration
  });
}

/**
 * Generates common response for signUp, signIn and check methods.
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