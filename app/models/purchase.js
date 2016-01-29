'use strict';

var config = require('config');

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
 * Class methods definitions:
 */

/**
 * Model definition:
 */

module.exports = function (sequelize, DataTypes) {

  var Purchase = sequelize.define('Purchase', {
    ownerId: {
      type: DataTypes.INTEGER,
      field: 'owner_id',
      allowNull: false,
      validate: {}
    },
    roomId: {
      type: DataTypes.INTEGER,
      field: 'room_id',
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
    },
    amount: {
      type: DataTypes.INTEGER,
      field: 'amount',
      allowNull: false,
      validate: {
        min: 0
      }
    },
    amountPerUser: {
      type: DataTypes.INTEGER,
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

  Purchase.publicFields = ['id', 'name', 'ownerId', 'roomId', 'amount', 'amountPerUser', 'createdAt', 'updatedAt'];

  return Purchase;
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

}