'use strict';

var path = require('path');
var extend = require('extend');

var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');

/**
 * Defaults settings for each environment
 */

var defaults = {
  rootPath: path.normalize(__dirname + '/..')
};

/**
 * Expose environment settings with defaults
 */

module.exports = {
  development: extend({}, defaults, development),
  test: extend({}, defaults, test),
  production: extend({}, defaults, production)
}[process.env.NODE_ENV || 'development'];