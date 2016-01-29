'use strict';

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'room_users';

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
  { unique: 'user_room_index', fields: ['user_id', 'room_id'] }
];

/**
 * Model definition:
 */

module.exports = function (sequelize, DataTypes) {
  var RoomUsers = sequelize.define('RoomUsers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      validate: {}
    },
    roomId: {
      type: DataTypes.STRING,
      field: 'room_id',
      allowNull: false,
      validate: {}
    }
  }, options);


  return RoomUsers;
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
  models.Room.belongsToMany(models.User, { through: models.RoomUsers, foreignKey: 'userId' });
  models.User.belongsToMany(models.Room, { through: models.RoomUsers, foreignKey: 'roomId' });
}