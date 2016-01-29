'use strict';

var config = require('config');

var response = require('helpers/response');

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

controller.byRoom = function *(next) {
  let data = {
    roomId: this.params.roomId,
    userId: this.state.user.id
  };

  // Check user existing in this room
  yield UserRepo.assertUserInRoom(data);

  let users = yield UserRepo.getUsersByRoomId(data.roomId);

  response.items(this, users);
};

module.exports = controller;