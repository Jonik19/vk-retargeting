'use strict';

var config = require('config');
var handlers = require('../services/handlers');

var controller = {};

/**
 * Catches all errors which happen in the middleware stream.
 *
 * @param next Next middleware function
 */

controller.catchAll = function *(next) {
  try {
    yield next;
  } catch(err) {
    console.log(err);

    return sendErrorResponse.call(this, err);
  }

  if(undefined === this.body) {
    sendErrorResponse.call(this, { name: 'NotFound' });
  }
};

/**
 * Helpers definitions:
 */

/**
 * Generates response error object.
 *
 * @param error Any error object
 * @returns {Object} Returns generated response error object or empty object.
 */

function generateError(error) {
  var handler = handlers[error.name];

  if(undefined !== handler) {
      return handler(error);
  }

  return {};
}

/**
 * Sets body with error response. Must be called in context of route (this === ctx).
 * Example:
 * ...
 * sendErrorResponse.call(this, error);
 * sendErrorResponse.apply(this, [error]);
 *
 * @param {Object} err Any error object
 */

function sendErrorResponse(err) {
  let generatedError = generateError(err);

  this.body = generatedError.response;
  this.status = generatedError.status || 500;
}


module.exports = controller;
