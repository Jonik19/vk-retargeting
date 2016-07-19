'use strict';

var response = require('../../../helpers/response');
var handleRepo = require('../../../repositories/handle');
var searchRepo = require('../../../repositories/search');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.search = function *() {
  var result = yield searchRepo.get(this.request.query);

  var ids = handleRepo.getFieldArrayFrom(result.items, 'owner_id');
  ids = handleRepo.getOnlyUsersIds(ids);
  ids = handleRepo.getUnique(ids);

  response.items(this, ids);
};

module.exports = controller;

/*
 * Helpers
 */

function getSearch() {

}
