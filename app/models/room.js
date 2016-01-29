'use strict';

var config = require('config');

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
  associate: associate
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

module.exports = function (sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      validate: {}
    },
    name: {
      type: DataTypes.STRING,
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

  Room.publicFields = ['id', 'name', 'userId', 'createdAt', 'updatedAt'];

  return Room;
};


/**
 * Class methods definitions:
 */


/**
 * Method for sequelize to associate models
 *
 * @param models
 */

function associate(models) {
  models.Room.hasMany(models.Purchase, { foreignKey: 'roomId' });
}