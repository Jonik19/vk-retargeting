'use strict';

var config = require('config');
var Sequelize = require('sequelize');
var sequelize = require('database');

var errors = require('modules/errors/services/errors');

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
  enter: enter
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
 * Class methods definitions:
 */

/**
 * Enters to specified room. If user is already in room throws 'AlreadyInRoomError' error.
 *
 * @param options ID of room to enter.
 * @returns {Promise.<T>|*}
 */

function enter(options) {
  options = options || {};

  return Room.findById(options.room_id)
    .then(function (room) {
      if(null === room) throw new errors.IncorrectDataError();

        return room.addUser(options.user_id).then(function (inserted) {
          // if nothing is added throw an error. It means that current user is already in this room
          if(0 === inserted.length) throw new errors.AlreadyInRoomError();

          return true;
        });
    });
}

module.exports = Room;