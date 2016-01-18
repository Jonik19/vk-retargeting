'use strict';

var config = require('config');

module.exports = {
  catchAll: catchAll
};

function *catchAll(next) {
  try {
    yield next;
  } catch(err) {
    // Generate error base on name of an error
    // for example if err.name ==='SequelizeValidationError'
    // show validation error

    console.log(err);

    this.body = err.message;
    this.status = err.status || 500;
  }
}