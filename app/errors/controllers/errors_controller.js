'use strict';

var config = require('config');

module.exports = {
  catchAll: catchAll
};

function *catchAll(next) {
  try {
    yield next;
  } catch(err) {
    // Generate error

    this.body = err.message;
    this.status = err.status || 500;
  }
}