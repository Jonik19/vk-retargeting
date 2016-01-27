'use strict';

var config = require('config');
var Sequelize = require('sequelize');
var sequelize = require('database');

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'purchases';

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

var Purchase = sequelize.define('Purchase', {
  owner_id: {
    type: Sequelize.INTEGER,
    field: 'owner_id',
    allowNull: false,
    validate: {}
  },
  room_id: {
    type: Sequelize.INTEGER,
    field: 'room_id',
    allowNull: false,
    validate: {}
  },
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  amount: {
    type: Sequelize.INTEGER,
    field: 'amount',
    allowNull: false,
    validate: {
      min: 0
    }
  },
  amount_per_user: {
    type: Sequelize.INTEGER,
    field: 'amount_per_user',
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, options);

/**
 * Fields to return on selects. It's using by security methods.
 * For example, we don't need to return password or password_hash to clients.
 */

Purchase.publicFields = ['id', 'name', 'owner_id', 'room_id', 'amount', 'amount_per_user', 'createdAt', 'updatedAt'];

/**
 * Class methods definitions:
 */

module.exports = Purchase;