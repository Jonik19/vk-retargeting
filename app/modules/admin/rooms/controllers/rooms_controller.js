'use strict';

var response = require('../../../../helpers/response');

var UserRepo = require('../../../../repositories/user');
var RoomRepo = require('../../../../repositories/room');

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
  let rooms = yield RoomRepo.getRooms(this.state.user.id);

  response.items(this, rooms);
};

/**
 * Returns specified room only if user is in this room.
 *
 * @param next
 */

controller.show = function *() {
  let data = {
    roomId: this.params.id,
    userId: this.state.user.id
  };

  // Check user existing in this room
  yield UserRepo.assertUserInRoom(data);

  let room = yield RoomRepo.getById(data.roomId);

  response.success(this, room);
};

/**
 * Creates new room by user and enters user in this room.
 *
 * @param next
 */

controller.create = function *() {
  let data = {
    name: this.request.body.name,
    userId: this.state.user.id
  };

  let room = yield RoomRepo.createAndEnter(data);

  response.success(this, room);
};

/**
 * Enter to room.
 *
 * @param next
 */

controller.enter = function *() {
  let data = {
    roomId: this.request.body.id,
    userId: this.state.user.id
  };

  let success = yield RoomRepo.enter(data);

  response.success(this, success);
};

/**
 * Generates
 *
 * @type {{}}
 */

controller.generateApprove = function *() {
  let data = {
    roomId: this.params.id,
    userId: this.state.user.id
  };

  // Check user existing in this room
  // TODO: check for owner. Only founder can generate approve links.
  yield UserRepo.assertUserInRoom(data);

  let link = yield RoomRepo.generateApproveLink(data);

  response.success(this, link.token);
};

module.exports = controller;