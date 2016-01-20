'use strict';

var config = require('config');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Sets allowed headers for Cross Origin Requests.
 * @param next
 */

controller.setAllowedHeaders = function *(next) {
  this.set('Access-Control-Allow-Headers', config.cors.headers.join(','));
  this.set('Access-Control-Allow-Methods', config.cors.methods.join(','));
  this.set('Access-Control-Allow-Origin', this.request.get('Origin'));
  this.set('Access-Control-Max-Age', config.cors.maxAge);

  //this.set('Access-Control-Allow-Credentials', true);

  yield next;
};

module.exports = controller;