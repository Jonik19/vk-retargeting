'use strict';

var _ = require('lodash');

var config = require('../../config');
var errors = require('../modules/errors/services/errors');
var vk = require('../helpers/vk');

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */

/**
 * Creates model and returns it.
 */

repo.get = function (data) {
  var options = _.assign(data, {v: '5.52'});

  return vk.call('newsfeed.search', options);
};

/**
 * Helper functions
 */

module.exports = repo;
