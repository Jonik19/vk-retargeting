'use strict';

var md5 = require('md5');
var config = require('config');
var errors = require('modules/errors/services/errors');

var Repository = require('helpers/repository');

var UserDomain = require('domains/user');
var RoomDomain = require('domains/room');

/**
 * Model definition:
 */

var UserRepo = function () {

};

/**
 * Class methods definitions:
 */

/**
 * Creates model and returns it.
 */

UserRepo.create = function () {
  return UserDomain.create.apply(UserDomain, arguments)
    .then(function (user) {
      return Repository.pickPublic(user, UserDomain.publicFields);
    });
};

/**
 * Finds user by id.
 */

UserRepo.findById = function () {
  return UserDomain.findById.apply(UserDomain, arguments)
    .then(function (user) {
      return Repository.pickPublic(user, UserDomain.publicFields);
    });
};

/**
 * Get room users.
 */

UserRepo.getUsersByRoomId = function (roomId) {
  return RoomDomain.build({id: roomId}).getUsers({ attributes: UserDomain.publicFields})
    .then(function (users) {
      return users.map(function (user) {
        return Repository.pickPublic(user, UserDomain.publicFields);
      });
    });
};

/**
 * Check user credentials. If credentials are correct then resolves current user from db
 * otherwise resolves a null value.
 *
 * @param {Object} options Object which consists of username and password fields
 * @returns {Promise}
 */

UserRepo.checkCredentials = function (options) {
  options = options || {};

  return UserDomain.findOne({
    where: {
      username: options.username,
      password_hash: UserDomain.hashPassword(options.password, config.authentication.secrets.password)
    },
    attributes: UserDomain.publicFields
  })
    // to return native object instead Domain instance
    .then(function (user) {
      return Repository.pickPublic(user, UserDomain.publicFields);
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

UserRepo.assertUserInRoom = function (options) {
  options = options || {};

  return RoomDomain.build({id: options.room_id}).getUsers({
    where: {id: options.user_id},
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


module.exports = UserRepo;