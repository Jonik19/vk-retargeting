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

repo.get = function (forms) {
  console.log(forms);
  var promises = [];

  forms.forEach(function (form) {
    promises.push(vk.call('newsfeed.search', repo._getFormOptions(form)));
  });

  return Promise.all(promises);
};

/**
 * Creates model and returns it.
 */

repo._getFormOptions = function (form) {
  var r =  _.assign({v: '5.52'}, form);

  console.log(r);

  return r;
};

/**
 * Helper functions
 */

module.exports = repo;
