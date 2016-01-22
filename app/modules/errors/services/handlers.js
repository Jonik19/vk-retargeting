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

handlers['NotFoundError'] = function (error) {
  return {
    response: {
      name: error.name,
      message: '404 Not Found'
    },
    status: 404
  };
};

handlers['IncorrectDataError'] = function (error) {
  return {
    response: {
      name: error.name,
      message: 'Please, type correct data and try again'
    },
    status: 400
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

handlers['ForbiddenError'] = function (error) {
  return {
    response: {
      name: error.name,
      message: 'Please, sign out to perform this action.'
    },
    status: 403
  };
};

handlers['AlreadyInRoomError'] = function (error) {
  return {
    response: {
      name: error.name,
      message: 'You can not enter to room, because you are already there.'
    },
    status: 400
  };
};

module.exports = handlers;