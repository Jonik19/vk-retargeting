'use strict';

/**
 * Error handlers. To make new error handler, create field with name of the error.
 * Example:
 *
 * To catch 'MyError' error, create appropriate handler
 * ...
 * handlers['MyError'] = function(error) {
 *   // error - is object of the thrown error
 *   ...
 *   return { response: itWillBeInTheBodyOfResponse, status: itWillBeResponseHttpStatus };
 * };
 */

var handlers = {};

handlers['UnauthorizedError'] = function (error) {
  return {
    response: {
      name: error.name,
      message: 'Please, sign in to perform this action'
    },
    status: 401
  };
};

handlers['SequelizeValidationError'] = handlers['SequelizeUniqueConstraintError'] = function (error) {
  return {
    response: {
      name: error.name,
      message: 'Validation error. Please, type correct data and try again.',
      errors: error.errors
    },
    status: 400
  };
};

handlers['NotFound'] = function (error) {
  return {
    response: {
      name: error.name,
      message: '404 Not Found'
    },
    status: 404
  };
};

module.exports = handlers;