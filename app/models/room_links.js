'use strict';

var crypto = require('crypto');
var config = require('../../config');

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'room_links';

/**
 * Methods of the model's class. Example:
 * ...
 * User.someIndependentMethod()
 */

options.classMethods = {};

/**
 * Method for sequelize to associate models
 *
 * @param models
 */

options.classMethods.associate = function (models) {

};



options.classMethods.generateToken = function (salt) {
  return crypto.createHmac('sha256', salt)
    .update(Date.now().toString()).digest('hex');
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
  var RoomLinks = sequelize.define('RoomLinks', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roomId: {
      type: DataTypes.INTEGER,
      field: 'room_id',
      allowNull: false,
      validate: {}
    },
    token: {
      type: DataTypes.STRING,
      field: 'token',
      allowNull: false,
      validate: {}
    },
    approvedBy: { // approved user id
      type: DataTypes.INTEGER,
      field: 'approved_by',
      allowNull: true,
      validate: {}
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  RoomLinks.publicFields = ['id', 'roomId', 'token', 'approvedBy'];

  return RoomLinks;
};
