'use strict';

var config = require('../../../../config');
var jwt = require('koa-jwt');

var service = {};

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

service.sign = function (user) {
  return jwt.sign(user, config.authentication.secrets.sign, {
    expiresInSeconds: config.authentication.tokenExpiration
  });
};

/**
 * Generates common response for signUp, signIn and check methods.
 *
 * @param user User object from db
 * @param token JWT token
 * @returns {{user: *, token: *}}
 */

service.generateUserResponse = function (user, token) {
  return {
    user: user,
    token: token
  };
};

/**
 * Returns token from header format('Bearer token123456789')
 * to 'token123456789'.
 *
 * @param {String} header
 * @returns {String}
 */

service.getTokenFromHeader = function (header) {
  if(!/^Bearer\s.+$/.test(header)) {
    return null;
  }

  return header.replace('Bearer ', '');
};

module.exports = service;