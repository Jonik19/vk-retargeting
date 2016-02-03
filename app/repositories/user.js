'use strict';

var config = require('../../config');

var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

var UserDomain = models.User;
var RoomDomain = models.Room;

/**
 * Model definition:
 */

var repo = {};

/**
 * Class methods definitions:
 */

/**
 * Creates model and returns it.
 */

repo.create = function (data) {
  return UserDomain.create(data)
    .then(function (user) {
      return repository.pickPublic(user, UserDomain.publicFields);
    });
};

/**
 * Finds user by id.
 */

repo.findById = function (id) {
  return UserDomain.findById(id, { attributes: UserDomain.publicFields });
};

/**
 * Get room users.
 */

repo.getUsersByRoomId = function (roomId) {
  return RoomDomain.build({id: roomId}).getUsers({ attributes: UserDomain.publicFields});
};

/**
 * Check user credentials. If credentials are correct then resolves current user from db
 * otherwise resolves a null value.
 *
 * @param {Object} options Object which consists of username and password fields
 * @returns {Promise}
 */

repo.checkCredentials = function (options) {
  options = options || {};

  return UserDomain.findOne({
    where: {
      username: options.username,
      passwordHash: UserDomain.hashPassword(options.password, config.authentication.secrets.password)
    },
    attributes: UserDomain.publicFields
  });
};

/**
 * Assert user existing in specified room. If user is not in room
 * throws 'IncorrectData' error.
 *
 * @param {Object} options
 * @param {Number} options.user_id
 * @param {Number} options.room_id
 * @returns {Promise.<T>|*}
 */

repo.assertUserInRoom = function (options) {
  options = options || {};

  return RoomDomain.build({id: options.roomId}).getUsers({
    where: {id: options.userId},
    attributes: UserDomain.publicFields
  })
    .then(function (users) {
      // User is not in the room
      if(users.length === 0) {
        throw new errors.IncorrectDataError();
      }

      return users;
    });
};

/**
 * Helper functions
 */


module.exports = repo;