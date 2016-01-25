'use strict';

var config = require('config');

var Response = require('helpers/response');
var errors = require('modules/errors/services/errors');

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

  let response = new Response(this, rooms);
  response.items();
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

  let response = new Response(this, room);
  response.success();
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

  let response = new Response(this, success);
  response.success();
};

module.exports = controller;