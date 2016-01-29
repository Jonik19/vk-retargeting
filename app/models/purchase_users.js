'use strict';

/**
 * Model options:
 */

var options = {};

/**
 * Name of the table which will be in db
 */

options.tableName = 'purchase_users';

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
 * Model definition:
 */
module.exports = function (sequelize, DataTypes) {
  var PurchaseUsers = sequelize.define('PurchaseUsers', {
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
    purchaseId: {
      type: DataTypes.INTEGER,
      field: 'purchase_id',
      allowNull: false,
      validate: {}
    }
  }, options);

  /**
   * Fields to return on selects. It's using by security methods.
   * For example, we don't need to return password or password_hash to clients.
   */

  PurchaseUsers.publicFields = ['id', 'userId', 'purchaseId'];

  return PurchaseUsers;
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
  models.Purchase.belongsToMany(models.User, { through: models.PurchaseUsers, foreignKey: 'purchaseId', as: 'PurchaseUsers' });
  models.User.belongsToMany(models.Purchase, { through: models.PurchaseUsers, foreignKey: 'userId', as: 'PurchaseUsers' });

// This association is required to find all purchases in specified room

  models.Purchase.hasMany(models.PurchaseUsers, { foreignKey: 'purchaseId', as: 'users' });
}