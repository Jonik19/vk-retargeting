'use strict';

var config = require('config');
var Sequelize = require('sequelize');
var sequelize = require('database');

let Purchase = require('domains/purchase');
let Room = require('domains/room');


Room.hasMany(Purchase, { foreignKey: 'room_id' });