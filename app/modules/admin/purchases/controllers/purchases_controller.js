'use strict';

var config = require('config');

var response = require('helpers/response');
var errors = require('modules/errors/services/errors');

var PurchaseRepo = require('repositories/purchase');
var UserRepo = require('repositories/user');


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

  let data = {
    room_id: this.params.roomId,
    user_id: this.state.user.id
  };

  // Check user existing in this room
  yield UserRepo.assertUserInRoom(data);

  let purchases = yield PurchaseRepo.getPurchasesByRoomId(data.room_id);

  response.items(this, purchases);
};

/**
 * Creates purchase.
 *
 * @param next
 */

controller.create = function *(next) {
  let data = {
    owner_id: this.state.user.id, // id of user which makes this purchase
    room_id: this.params.roomId, // id of the room to insert this purchase
    name: this.request.body.name, // name of the purchase
    amount: this.request.body.amount, // Full price of the purchase
    // TODO: users must be an array
    users: this.request.body.users // array of users ids
  };

  // Check user existing in this room
  yield UserRepo.assertUserInRoom({
    user_id: data.owner_id,
    room_id: data.room_id
  });

  let purchase = yield PurchaseRepo.create(data);

  response.success(this, purchase);
};

module.exports = controller;