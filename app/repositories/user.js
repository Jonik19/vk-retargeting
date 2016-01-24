'use strict';

var md5 = require('md5');
var config = require('config');

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
 * Get user rooms.
 */

UserRepo.getRooms = function (userId) {
  return UserDomain.build({id: userId}).getRooms({ attributes: RoomDomain.publicFields})
    .then(function (rooms) {
      // TODO: bottleneck
      return rooms.map(function (room) {
        return Repository.pickPublic(room, RoomDomain.publicFields);
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
 * Helper functions
 */


module.exports = UserRepo;