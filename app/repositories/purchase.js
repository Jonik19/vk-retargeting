'use strict';

var _ = require('lodash');

var errors = require('../modules/errors/services/errors');

var repository = require('../helpers/repository');
var models = require('../models');

var Purchase = models.Purchase;
var PurchaseUsers = models.PurchaseUsers;

/**
 * Repo definition:
 */

var repo = {};

/**
 * Methods definitions:
 */


/**
 * Creates purchase, adds users to the purchase.
 * Returns newly created purchase.
 */

repo.create = function (data) {
  data = data || {};

  _.assign(data, {
    ownerId: data.ownerId,
    roomId: data.roomId,
    name: data.name,
    amount: data.amount,
    amountPerUser: getAmountPerUser(data.amount, data.users)
  });

  return Purchase.create(data)
    .then(function (purchase) {
      // TODO: Check for each user existing in the room.

      return purchase.addPurchaseUsers(data.users)
        // it gets 'purchaseUsers' array in the callback
        .then(function () {
          return repository.pickPublic(purchase, Purchase.publicFields);
        });
    });
};

/**
 * Finds purchase by id.
 */

repo.findById = function (id) {
  return Purchase.findById(id, { attributes: Purchase.publicFields });
};

/**
 * Finds users credits in specified room.
 */

repo.getCreditsByRoomId = function (roomId) {
  return PurchaseUsers.findAll({
    attributes: ['userId'],
    include: [
      {
        model: Purchase,
        where: {roomId: roomId},
        attributes: [[models.sequelize.fn('SUM', models.sequelize.col('amount_per_user')), 'credit']],
        as: 'purchase'
      }
    ],
    group: 'userId'
  });
};

/**
 * Finds users debits in specified room.
 */

repo.getDebitsByRoomId = function (roomId) {
  return Purchase.findAll({
    where: {roomId: roomId},
    attributes: ['ownerId', [models.sequelize.fn('SUM', models.sequelize.col('amount')), 'debit']],
    group: 'ownerId'
  });
};

/**
 * Finds all purchases in specified room.
 *
 * @param {Number} roomId ID of a room to find.
 * @returns {Promise.<T>|*}
 */

repo.getPurchasesByRoomId = function (roomId) {
  return Purchase.findAll({
    where: {roomId: roomId},
    include: [{model: PurchaseUsers, attributes: ['userId'], as: 'users'}],
    attributes:  Purchase.publicFields
  });
};


/**
 * Helper functions
 */


/**
 * Returns amount per each user
 *
 * @param amount Full amount for all users
 * @param users
 * @returns {number}
 */

function getAmountPerUser(amount, users) {
  //TODO: use try catch
  if(Array.isArray(users) && users.length > 0) {
    return amount/users.length;
  }

  throw new errors.IncorrectDataError('Please, choose at least one user');
}

/**
 * Exporting
 */

module.exports = repo;