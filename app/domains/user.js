'use strict';

var Sequelize = require('sequelize');
var sequelize = require('database');

module.exports = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    field: 'username'
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  password: {
    type: Sequelize.STRING,
    field: 'username'
  }
}, {
  tableName: 'users'
});