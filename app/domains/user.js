'use strict';

var crypto = require('crypto');
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

options.tableName = 'users';

/**
 * Methods of the model's class. Example:
 * ...
 * User.someIndependentMethod()
 */

options.classMethods = {
  hashPassword: hashPassword
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

var User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    field: 'username',
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9]+$/i
    }
  },
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false,
    validate: {}
  },
  passwordHash: {
    type: Sequelize.STRING,
    field: 'password_hash',
    allowNull: false,
    validate: {}
  },
  password: {
    type: Sequelize.VIRTUAL,
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

/**
 * Returns hash of password and secret in md5 format.
 *
 * @param {String} password
 * @param {String} salt
 * @returns {String}
 */

function hashPassword(password, salt) {
  return crypto.createHmac('sha256', salt)
    .update(password).digest('hex');
}

module.exports = User;