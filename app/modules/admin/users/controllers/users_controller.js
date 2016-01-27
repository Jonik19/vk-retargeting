'use strict';

var config = require('config');

var Response = require('helpers/response');

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
    room_id: this.params.roomId,
    user_id: this.state.user.id
  };

  // Check user existing in this room
  yield UserRepo.assertUserInRoom(data);

  let users = yield UserRepo.getUsersByRoomId(data.room_id);

  let response = new Response(this, users);
  response.items();
};

module.exports = controller;