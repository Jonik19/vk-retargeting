'use strict';

var config = require('config');
var Sequelize = require('sequelize');
var sequelize = require('database');

let Purchase = require('domains/purchase');
let User = require('domains/user');

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'purchase_users';

/**
 * Methods of the model's class. Example:
 * ...
 * User.someIndependentMethod()
 */

options.classMethods = {

};

/**
 * Methods of the model's instance. Example:
 *
 * var user = User.create({});
 * ...
 * user.someModelsMethod();
 */

options.instanceMethods = {

};

/**
 * List of table indexes
 *
 */

options.indexes = [

];

/**
 * Model definition:
 */

var PurchaseUsers = sequelize.define('PurchaseUsers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    allowNull: false,
    validate: {}
  },
  purchaseId: {
    type: Sequelize.INTEGER,
    field: 'purchase_id',
    allowNull: false,
    validate: {}
  }
}, options);

/**
 * Class methods definitions:
 */

Purchase.belongsToMany(User, { through: PurchaseUsers, foreignKey: 'purchaseId', as: 'PurchaseUsers' });
User.belongsToMany(Purchase, { through: PurchaseUsers, foreignKey: 'userId', as: 'PurchaseUsers' });

// This association is required to find all purchases in specified room

Purchase.hasMany(PurchaseUsers, { foreignKey: 'purchaseId', as: 'users' });

/**
 * Fields to return on selects. It's using by security methods.
 * For example, we don't need to return password or password_hash to clients.
 */

PurchaseUsers.publicFields = ['id', 'userId', 'purchaseId'];

module.exports = PurchaseUsers;