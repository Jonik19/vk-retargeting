'use strict';

var response = require('../../../../helpers/response');

var PurchaseRepo = require('../../../../repositories/purchase');
var UserRepo = require('../../../../repositories/user');

/**
 * Methods definition:
 */

var controller = {};

/**
 * Returns list of user's rooms.
 *
 * @param next
 */

controller.index = function *() {

  let data = {
    roomId: this.params.roomId,
    userId: this.state.user.id
  };

  // Check user existing in this room
  yield UserRepo.assertUserInRoom(data);

  let purchases = yield PurchaseRepo.getPurchasesByRoomId(data.roomId);

  response.items(this, purchases);
};

/**
 * Creates purchase.
 *
 * @param next
 */

controller.create = function *() {
  let data = {
    ownerId: this.state.user.id, // id of user which makes this purchase
    roomId: this.params.roomId, // id of the room to insert this purchase
    name: this.request.body.name, // name of the purchase
    amount: this.request.body.amount, // Full price of the purchase
    // TODO: users must be an array
    users: this.request.body.users // array of users ids
  };

  // Check user existing in this room
  yield UserRepo.assertUserInRoom({
    userId: data.ownerId,
    roomId: data.roomId
  });

  let purchase = yield PurchaseRepo.create(data);

  response.success(this, purchase);
};

module.exports = controller;