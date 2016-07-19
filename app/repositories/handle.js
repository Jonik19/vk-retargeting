'use strict';

var _ = require('lodash');

var repo = {};

/**
 *
 */

repo.getFieldArrayFrom = function (arr, field) {
  return _.map(arr, field);
};

/**
 *
 */

repo.getOnlyUsersIds = function (ids) {
  return ids.filter(function (id) {
    return parseInt(id) > 0;
  });
};

/**
 *
 */

repo.getUnique = function (ids) {
  return _.uniq(ids);
};


module.exports = repo;
