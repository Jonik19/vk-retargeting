'use strict';

var _ = require('lodash');

var config = require('../../config');
var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

var UserDomain = models.User;
var RoomDomain = models.Room;
var RoomLinks = models.RoomLinks;

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */

/**
 * Creates model and returns it.
 */

repo.create = function (data) {
  return RoomDomain.create(data)
    .then(function (user) {
      return repository.pickPublic(user, RoomDomain.publicFields);
    });
};

/**
 * Finds room by id.
 */

repo.getById = function (id) {
  return RoomDomain.findById(id, {
    attributes: RoomDomain.publicFields
  });
};

/**
 * Get user rooms.
 *
 * @param userId ID of user
 * @returns {Promise.<T>|*}
 */

repo.getRooms = function (userId) {
  return UserDomain.build({id: userId}).getRooms({ attributes: RoomDomain.publicFields});
};

/**
 * Enters to specified room. If user is already in room throws 'AlreadyInRoomError' error.
 *
 * @param {Object} options
 * @param {String} options.room_id room_id to enter
 * @param {String} options.user_id user_id to enter to room
 * @returns {Promise.<T>|*}
 */

repo.enter = function (options) {
  options = options || {};

  return RoomDomain.findById(options.roomId, {
    attributes: RoomDomain.publicFields
  })
    .then(function (room) {
      if(null === room) throw new errors.IncorrectDataError();

      return repo.enterByModel({model: room, userId: options.userId});
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

repo.enterByModel = function (options) {
  options = options || {};

  return options.model.addUser(options.userId)
    .then(function (inserted) {
      // if nothing is added throw an error. It means that current user is already in this room
      if(0 === inserted.length) throw new errors.AlreadyInRoomError();

      return options.model;
    });
};

/**
 * Creates room and enters to this room by current user.
 * If user is already in room throws 'AlreadyInRoomError' error.
 *
 * @param data ID of room to enter.
 * @returns {Promise.<T>|*}
 */

repo.createAndEnter = function (data) {
  data = data || {};

  return RoomDomain.create(data).
    then(function (room) {
      return repo.enterByModel({model: room, userId: data.userId});
    })
    .then(function (room) {
      return repository.pickPublic(room, RoomDomain.publicFields);
    });
};

/**
 * Generates one time link for approving it in future by somebody.
 *
 * @param {Object} data
 * @param {Number} data.roomId
 */

repo.generateApproveLink = function (data) {
  data = data || {};

  _.assign(data, {
    roomId: data.roomId,
    token: RoomLinks.generateToken(config.models.roomLinks.secrets.token)
  });

  return RoomLinks.create(data)
    .then(function (roomLink) {
      return repository.pickPublic(roomLink, RoomLinks.publicFields);
    });
};

/**
 * Finds link by specified token.
 *
 * @param {String} token
 */

repo.getLinkByToken = function (token) {
  return RoomLinks.findOne({
    where: { token: token, approvedBy: null },
    attributes: RoomLinks.publicFields
  }).then(function (link) {
    // If there is no such link
    if(null === link) {
      throw new errors.IncorrectLinkError();
    }

    return link;
  });
};

/**
 * Marks link as approved by some user.
 *
 * @param {String} data
 * @param {Number} data.userId User id approved by this link
 * @param {Number} data.id Id of the link to update
 */

repo.approveLinkById = function (data) {
  data = data || {};

  return RoomLinks.update({approvedBy: data.userId}, {where: {id: data.id, approvedBy: null}});
};

/**
 * Helper functions
 */

module.exports = repo;