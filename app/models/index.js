'use strict';

var path = require('path');
var fs = require('fs');

var config = require('config');

var Sequelize = require('sequelize');
var sequelize = require('database');

var models = composeModels(path.join(config.rootPath, 'app/models'), sequelize);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;

/**
 * Helpers definitions:
 */

/**
 * Imports models to sequelize and returns object consisting of all models.
 *
 * @param {String} pathToModelsFolder
 * @param {Object} sequelizeInstance
 */

function composeModels(pathToModelsFolder, sequelizeInstance) {
  var models = {};

  // Load models and compose to one object

  fs
    .readdirSync(pathToModelsFolder)

    // don't import index.js file

    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
    })

    // import model and add it to compose object

    .forEach(function (filename) {
      let model = sequelizeInstance.import(path.join(pathToModelsFolder, '/', filename));

      models[model.name] = model;
    });

  // Apply associations to every model

  Object.keys(models).forEach(function(modelName) {
    if ("associate" in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  return models;
}