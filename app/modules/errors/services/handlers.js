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

handlers['NotFoundError'] = function (error) {
  return {
    response: {
      name: error.name,
      message: '404 Not Found'
    },
    status: 404
  };
};

handlers['SyntaxError'] = function (error) {
  return {
    response: {
      name: error.name,
      message: 'Please, check data. You should send correct data.'
    },
    status: 400
  };
};

handlers['UnhandledError'] = function () {
  return {
    response: {
      name: 'UnhandledError',
      message: 'We don\'t know a cause of the problem.'
    },
    status: 500
  };
};

module.exports = handlers;
