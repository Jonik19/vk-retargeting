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

  /**
   * Routes: Rooms
   */

  router.use(mount('/rooms', authenticationController.onlyAuthenticated));

  router.get('/rooms', function *(next) {
    this.body = `I am authenticated ${this.state.user.username}`;
  });

  /**
   * Routes: Purchases
   */

  router.use(mount('/purchases', authenticationController.onlyAuthenticated));

  /**
   * Return instance of router. Don't delete it.
   */

  return router;
}

module.exports = {
  init: init
};