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
  }
}, options);

/**
 * Class methods definitions:
 */

Purchase.belongsToMany(User, { through: PurchaseUsers, foreignKey: 'purchase_id' });
User.belongsToMany(Purchase, { through: PurchaseUsers, foreignKey: 'user_id' });

Purchase.hasMany(PurchaseUsers, { foreignKey: 'purchase_id', as: 'users' });

module.exports = PurchaseUsers;