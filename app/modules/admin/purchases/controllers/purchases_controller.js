'use strict';

var config = require('config');

var Response = require('helpers/response');
var errors = require('modules/errors/services/errors');

var PurchaseRepo = require('repositories/purchase');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.index = function *(next) {
  let purchases = yield PurchaseRepo.getPurchasesByRoomId(this.params.roomId);

  let response = new Response(this, purchases);
  response.items();
};

module.exports = controller;