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

options.tableName = 'rooms';

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

var Room = sequelize.define('Room', {
  user_id: {
    type: Sequelize.INTEGER,
    field: 'user_id',
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
  }
}, options);

/**
 * Fields to return on selects. It's using by security methods.
 * For example, we don't need to return password or password_hash to clients.
 */

Room.publicFields = ['id', 'name', 'user_id', 'createdAt', 'updatedAt'];

/**
 * Class methods definitions:
 */

module.exports = Room;