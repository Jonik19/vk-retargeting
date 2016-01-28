'use strict';

var _ = require('lodash');

var repository = {};

/**
 * Returns object with allowed fields which are passed through second parameter.
 *
 * @param {Object} model Domain instance
 * @param {Array} publicFields Array of public fields
 * @returns {Object} Object with
 */

repository.pickPublic = function (model, publicFields) {
  if(model === null) return model;

  return _.pick(model, publicFields);
};

module.exports = repository;