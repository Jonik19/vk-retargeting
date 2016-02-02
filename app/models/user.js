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

options.tableName = 'users';

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

options.classMethods.associate = function () {

};

/**
 * Returns hash of password and secret in md5 format.
 *
 * @param {String} password
 * @param {String} salt
 * @returns {String}
 */

options.classMethods.hashPassword = function hashPassword(password, salt) {
  return crypto.createHmac('sha256', salt)
    .update(password).digest('hex');
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
  { unique: true, fields: ['username'] }
];

/**
 * Model definition:
 */

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      field: 'username',
      allowNull: false,
      validate: {
        is: /^[a-zA-Z0-9]+$/i
      }
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false,
      validate: {}
    },
    passwordHash: {
      type: DataTypes.STRING,
      field: 'password_hash',
      allowNull: false,
      validate: {}
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      set: function (val) {
        this.setDataValue('password', val);
        this.setDataValue('passwordHash', User.hashPassword(val, config.authentication.secrets.password));
      },
      validate: {
        len: [6, 100]
      }
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  User.publicFields = ['id', 'name', 'username', 'createdAt', 'updatedAt'];

  return User;
};