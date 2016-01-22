'use strict';

var md5 = require('md5');
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
  checkCredentials: checkCredentials
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
  password_hash: {
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
      this.setDataValue('password_hash', hashPassword(val, config.secrets.password));
    },
    validate: {
      len: [6, 100]
    }
  }
}, options);

/**
 * Class methods definitions:
 */

/**
 * Check user credentials. If credentials are correct then resolves current user from db
 * otherwise resolves a null value.
 *
 * @param {Object} options Object which consists of username and password fields
 * @returns {Promise}
 */

function checkCredentials(options) {
  options = options || {};

  return new Promise(function (resolve, reject) {
    User.findOne({ where: {username: options.username, password_hash: hashPassword(options.password, config.secrets.password)} })
    .then(resolve)
    .catch(reject);
  });
}

/**
 * Returns hash of password and secret in md5 format.
 *
 * @param {String} password
 * @param {String} salt
 * @returns {String}
 */

function hashPassword(password, salt) {
  return md5(password + salt);
}

module.exports = User;