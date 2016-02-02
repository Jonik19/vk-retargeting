'use strict';

var _ = require('lodash');

var errors = require('../modules/errors/services/errors');

var Repository = require('../helpers/repository');
var models = require('../models');

var PurchaseDomain = models.Purchase;
var PurchaseUsers = models.PurchaseUsers;
var RoomUsers = models.RoomUsers;

/**
 * Model definition:
 */

var PurchaseRepo = function () {

};

/**
 * Class methods definitions:
 */


/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

PurchaseRepo.create = function (data) {
  data = data || {};

  _.assign(data, {
    ownerId: data.ownerId,
    roomId: data.roomId,
    name: data.name,
    amount: data.amount,
    amountPerUser: getAmountPerUser(data.amount, data.users)
  });

  return PurchaseDomain.create(data)
    .then(function (purchase) {
      // TODO: Check for each user existing in the room.

      return purchase.addPurchaseUsers(data.users)
        // it gets 'purchaseUsers' array in the callback
        .then(function () {
          return purchase;
        });
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
 * Finds room by id.
 */

PurchaseRepo.getCreditsByRoomId = function (roomId) {
  return PurchaseUsers.findAll({
    attributes: ['userId'],
    include: [
      {
        model: PurchaseDomain,
        where: {roomId: roomId},
        attributes: [[models.sequelize.fn('SUM', models.sequelize.col('amount_per_user')), 'credit']],
        as: 'purchase'
      }
    ],
    group: 'user_id'
  })
    .then(function (credits) {
      return credits;
    });
};

/**
 * Finds all purchases in specified room.
 *
 * @param {Number} roomId ID of a room to find.
 * @returns {Promise.<T>|*}
 */

let selectablePurchaseUsersFields = ['userId'];

PurchaseRepo.getPurchasesByRoomId = function (roomId) {
  // TODO: move constants in config

  return PurchaseDomain.findAll({
    where: {roomId: roomId},
    include: [{model: PurchaseUsers, attributes: selectablePurchaseUsersFields, as: 'users'}],
    attributes:  PurchaseDomain.publicFields
  })
    .then(function (purchases) {
      let publicFieldsWithIncludes = PurchaseDomain.publicFields.concat('users');

      // TODO: bottleneck
      return purchases.map(function (purchase) {
        return Repository.pickPublic(purchase, publicFieldsWithIncludes);
      });
    });
};


/**
 * Helper functions
 */

function getAmountPerUser(amount, users) {
  //TODO: use try catch
  if(Array.isArray(users) && users.length > 0) {
    return amount/users.length;
  }

  throw new errors.IncorrectDataError();
}

module.exports = PurchaseRepo;