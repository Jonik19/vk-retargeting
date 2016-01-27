'use strict';

var config = require('config');

var Repository = require('helpers/repository');

var UserDomain = require('domains/user');
var RoomDomain = require('domains/room');

var errors = require('modules/errors/services/errors');

/**
 * Model definition:
 */

var RoomRepo = function () {

};

/**
 * Class methods definitions:
 */

/**
 * Creates model and returns it.
 */

RoomRepo.create = function () {
  return RoomDomain.create.apply(RoomDomain, arguments)
    .then(function (user) {
      return Repository.pickPublic(user, RoomDomain.publicFields);
    });
};

/**
 * Finds room by id.
 */

RoomRepo.getById = function (id) {
  return RoomDomain.findById(id)
    .then(function (user) {
      return Repository.pickPublic(user, RoomDomain.publicFields);
    });
};

/**
 * Get user rooms.
 *
 * @param userId ID of user
 * @returns {Promise.<T>|*}
 */

RoomRepo.getRooms = function (userId) {
  return UserDomain.build({id: userId}).getRooms({ attributes: RoomDomain.publicFields})
    .then(function (rooms) {
      // TODO: bottleneck
      return rooms.map(function (room) {
        return Repository.pickPublic(room, RoomDomain.publicFields);
      });
    });
};

/**
 * Enters to specified room. If user is already in room throws 'AlreadyInRoomError' error.
 *
 * @param {Object} options
 * @param {String} options.room_id room_id to enter
 * @param {String} options.user_id user_id to enter to room
 * @returns {Promise.<T>|*}
 */

RoomRepo.enter = function (options) {
  options = options || {};

  return RoomDomain.findById(options.room_id)
    .then(function (room) {
      if(null === room) throw new errors.IncorrectDataError();

      return RoomRepo.enterByModel({model: room, user_id: options.user_id});
    });
};

/**
 * Enters to specified room by existing model.
 * If user is already in room throws 'AlreadyInRoomError' error.
 *
 * @param {Object} options
 * @param {Object} options.model RoomDomain instance
 * @param {String} options.user_id user_id to enter to room
 * @returns {Promise.<T>|*}
 */

RoomRepo.enterByModel = function (options) {
  options = options || {};

  return options.model.addUser(options.user_id).then(function (inserted) {
        // if nothing is added throw an error. It means that current user is already in this room
        if(0 === inserted.length) throw new errors.AlreadyInRoomError();

        return Repository.pickPublic(options.model, RoomDomain.publicFields);
      });
};

/**
 * Creates room and enters to this room by current user.
 * If user is already in room throws 'AlreadyInRoomError' error.
 *
 * @param data ID of room to enter.
 * @returns {Promise.<T>|*}
 */

RoomRepo.createAndEnter = function (data) {
  data = data || {};

  return RoomDomain.create.call(RoomDomain, data).
    then(function (room) {
      return RoomRepo.enterByModel({model: room, user_id: data.user_id});
    });
};

/**
 * Helper functions
 */

module.exports = RoomRepo;