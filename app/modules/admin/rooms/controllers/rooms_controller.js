'use strict';

var config = require('config');

var Response = require('helpers/response');
var errors = require('modules/errors/services/errors');

var Room = require('domains/room');
var User = require('domains/user');

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
  let rooms = yield this.state.user.getRooms();

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

  let room = yield Room.create(data);

  // Enter room by creator

  yield this.state.user.addRoom(room);

  let response = new Response(this, room);
  response.success();
};



module.exports = controller;