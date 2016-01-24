'use strict';

var config = require('config');
var Response = require('helpers/response');
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

    return sendErrorResponse(this, err);
  }

  if(undefined === this.body && this.method !== 'OPTIONS') {
    sendErrorResponse(this, { name: 'NotFoundError' });
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
 * sendErrorResponse(this, error);
 * sendErrorResponse(this, [error]);
 *
 * @param {Object} ctx Any error object
 * @param {Object} err Any error object
 */

function sendErrorResponse(ctx, err) {
  let generatedError = generateError(err);

  var response = new Response(ctx, generatedError.response);
  response.error(generatedError.status);
}


module.exports = controller;
