'use strict';

var md5 = require('md5');
var config = require('config');
var Sequelize = require('sequelize');
var sequelize = require('database');

var tableName = 'users';

var classMethods = {
  checkCredentials: checkCredentials
};

var instanceMethods = {

};

var User = module.exports = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  password_hash: {
    type: Sequelize.STRING,
    field: 'password_hash'
  },
  password: {
    type: Sequelize.VIRTUAL,
    set: function (val) {
      this.setDataValue('password', val);
      this.setDataValue('password_hash', hashPassword(val));
    }
  }
}, {
  tableName: tableName,
  classMethods: classMethods,
  instanceMethods: instanceMethods
});

/**
 * Class methods definitions
 **/

function checkCredentials(username, password) {
  return new Promise(function (resolve, reject) {
    User.findOne({ where: {username: username, password_hash: hashPassword(password)} })
    .then(resolve)
    .catch(reject);
  });
}

function hashPassword(password) {
  return md5(`${password}${config.secrets.password}`);
}