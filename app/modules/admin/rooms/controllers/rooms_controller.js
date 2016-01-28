'use strict';

var config = require('config');

var response = require('helpers/response');
var errors = require('modules/errors/services/errors');

var UserRepo = require('repositories/user');
var RoomRepo = require('repositories/room');

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
  let rooms = yield RoomRepo.getRooms(this.state.user.id);

  response.items(this, rooms);
};

/**
 * Returns specified room only if user is in this room.
 *
 * @param next
 */

controller.show = function *(next) {
  let data = {
    room_id: this.params.id,
    user_id: this.state.user.id
  };

  // Check user existing in this room
  yield UserRepo.assertUserInRoom(data);

  let room = yield RoomRepo.getById(data.room_id);

  response.success(this, room);
};

/**
 * Creates new room by user and enters user in this room.
 *
 * @param next
 */

controller.create = function *(next) {
  let data = {
    name: this.request.body.name,
    user_id: this.state.user.id
  };

  let room = yield RoomRepo.createAndEnter(data);

  response.success(this, room);
};

/**
 * Enter to room.
 *
 * @param next
 */

controller.enter = function *(next) {
  let data = {
    room_id: this.request.body.id,
    user_id: this.state.user.id
  };

  let success = yield RoomRepo.enter(data);

  response.success(this, success);
};

module.exports = controller;