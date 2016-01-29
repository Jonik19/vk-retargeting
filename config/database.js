'use strict';

var config = require('config');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  define: {
    charset: 'utf8'
  },

  force: false
});


module.exports = sequelize;