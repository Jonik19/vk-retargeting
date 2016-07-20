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
  var params = _getSearchParams(this);

  console.log(params);

  var result = yield searchRepo.get(params);

  console.log(result);

  response.items(this, [1,2,3,4]);
};

module.exports = controller;

/**
 *
 *
 * @param next
 */

function _getSearchParams(ctx) {
  var forms = ctx.request.query.forms;
  var arr = [];

  //Passed array

  if(Array.isArray(forms)) {
    return forms;
  }

  // Passed object instead of array

  if(forms) {
    arr.push(JSON.parse(forms));

    return arr;
  }

  return [];
}