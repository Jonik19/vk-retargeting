'use strict';

var config = require('config');
var Sequelize = require('sequelize');
var sequelize = require('database');

let Room = require('domains/room');
let User = require('domains/user');

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'room_users';

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
  { unique: 'user_room_index', fields: ['user_id', 'room_id'] }
];

/**
 * Model definition:
 */

var RoomUsers = sequelize.define('RoomUsers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
  //user_id: {
  //  type: Sequelize.INTEGER,
  //  field: 'user_id',
  //  allowNull: false,
  //  validate: {}
  //},
  //room_id: {
  //  type: Sequelize.STRING,
  //  field: 'room_id',
  //  allowNull: false,
  //  validate: {}
  //}
}, options);

/**
 * Class methods definitions:
 */

Room.belongsToMany(User, { through: RoomUsers, foreignKey: 'room_id' });
User.belongsToMany(Room, { through: RoomUsers, foreignKey: 'user_id' });

module.exports = RoomUsers;