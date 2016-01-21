'use strict';

var config = require('config');

var Response = require('helpers/response');
var errors = require('modules/errors/services/errors');
var Room = require('domains/room');

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
  let rooms = yield Room.getByUserId(this.state.user.id);

  console.log(rooms);

  let response = new Response(this, rooms);
  response.items();
};

/**
 * Creates new room by user.
 * TODO: enters user in this room.
 *
 * @param next
 */

controller.create = function *(next) {
  let data = {
    name: this.request.body.name,
    user_id: this.state.user.id
  };

  let room = yield Room.create(data);

  let response = new Response(this, room);
  response.success();
};



module.exports = controller;