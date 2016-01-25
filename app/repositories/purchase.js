'use strict';

var config = require('config');

var Repository = require('helpers/repository');
var sequelize = require('database');

var UserDomain = require('domains/user');
var PurchaseDomain = require('domains/purchase');
var RoomDomain = require('domains/room');
var PurchaseUsers = require('domains/purchase_users');

var errors = require('modules/errors/services/errors');

/**
 * Model definition:
 */

var PurchaseRepo = function () {

};

/**
 * Class methods definitions:
 */

/**
 * Creates model and returns it.
 */

PurchaseRepo.create = function () {
  return PurchaseDomain.create.apply(PurchaseDomain, arguments)
    .then(function (user) {
      return Repository.pickPublic(user, PurchaseDomain.publicFields);
    });
};

/**
 * Finds room by id.
 */

PurchaseRepo.findById = function () {
  return PurchaseDomain.findById.apply(PurchaseDomain, arguments)
    .then(function (user) {
      return Repository.pickPublic(user, PurchaseDomain.publicFields);
    });
};


/**
 * Finds all purchases in specified room.
 *
 * @param {Number} roomId ID of a room to find.
 * @returns {Promise.<T>|*}
 */

PurchaseRepo.getPurchasesByRoomId = function (roomId) {
  //'SELECT p.id, p.user_id, p.amount, GROUP_CONCAT(pu.user_id) as users FROM purchases as p LEFT JOIN purchase_users as pu ON p.id = pu.purchase_id WHERE p.room_id = 1 GROUP BY p.id;'

  return PurchaseDomain.findAll({
    where: {room_id: roomId},
    // TODO: move constants in config
    include: [{model: PurchaseUsers, attributes: ['user_id'], as: 'users'}]
  })
    .then(function (purchases) {
      var publicFieldsWithUsers = PurchaseDomain.publicFields.concat('users');

      // TODO: bottleneck
      return purchases.map(function (purchase) {
        return Repository.pickPublic(purchase, publicFieldsWithUsers);
      });
    });
};


/**
 * Helper functions
 */

module.exports = PurchaseRepo;