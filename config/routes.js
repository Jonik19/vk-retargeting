'use strict';

var jwt = require('koa-jwt');
var mount = require('koa-mount');
var compose = require('koa-compose');
var bodyParser = require('koa-bodyparser');

function init(app) {
  var router = require('koa-router')();

  /**
   * Errors handling
   */

  var errorsController = require('modules/errors/controllers/errors_controller');

  app.use(errorsController.catchAll);

  /**
   * CORS
   */

  var corsController = require('modules/cors/controllers/cors_controller');

  app.use(corsController.setAllowedHeaders);

  /**
   * Helper middlewares
   */

  router.use(bodyParser());

  /**
   * Your routes go here
   */

  /**
   * Routes: Authentication
   */

  var authenticationController = require('modules/authentication/controllers/authentication_controller');

//router.post('/sign-out', compose([authenticationController.onlyAuthenticated, authenticationController.signOut]));
  router.post('/sign-up', compose([authenticationController.onlyNotAuthenticated, authenticationController.signUp]));
  router.post('/sign-in', compose([authenticationController.onlyNotAuthenticated, authenticationController.signIn]));
  router.get('/check', compose([authenticationController.onlyAuthenticated, authenticationController.check]));

  /**
   * Routes: Rooms
   */

  var roomsController = require('modules/admin/rooms/controllers/rooms_controller');

  router.use(mount('/rooms', authenticationController.onlyAuthenticated));
  router.get('/rooms', roomsController.index);
  router.post('/rooms', roomsController.create);
  router.post('/rooms/enter', roomsController.enter);

  /**
   * Routes: Purchases
   */

  var purchasesController = require('modules/admin/purchases/controllers/purchases_controller');

  router.use(mount('/rooms/purchases', authenticationController.onlyAuthenticated));
  router.get('/rooms/:roomId/purchases', purchasesController.index);

  /**
   * Return instance of router. Don't delete it.
   */

  return router;
}

module.exports = {
  init: init
};