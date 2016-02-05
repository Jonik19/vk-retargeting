'use strict';

var config = require('../config');

var mount = require('koa-mount');
var cors = require('koa-cors');
var compose = require('koa-compose');
var bodyParser = require('koa-bodyparser');

function init(app) {
  var router = require('koa-router')();

  /**
   * Errors handling
   */

  var errorsController = require('../app/modules/errors/controllers/errors_controller');

  app.use(errorsController.catchAll);

  /**
   * Helper middlewares:
   */

  /**
   * CORS middleware
   */

  app.use(cors({
    maxAge: config.cors.maxAge,
    methods: config.cors.methods,
    headers: config.cors.headers,
    origin: config.cors.origin
  }));

  /**
   * Parses requested body to req.body field
   */

  router.use(bodyParser());

  /**
   * Your routes go here
   */

  /**
   * Routes: Authentication
   */

  var authenticationController = require('../app/modules/authentication/controllers/authentication_controller');

  router.post('/sign-up', compose([authenticationController.onlyNotAuthenticated, authenticationController.signUp]));
  router.post('/sign-in', compose([authenticationController.onlyNotAuthenticated, authenticationController.signIn]));
  router.get('/check', compose([authenticationController.onlyAuthenticated, authenticationController.check]));

  /**
   * Routes: Users
   */

  var usersController = require('../app/modules/admin/users/controllers/users_controller');

  router.use(mount('/users', authenticationController.onlyAuthenticated));
  router.get('/users/by_room/:roomId', usersController.byRoom);

  /**
   * Routes: Rooms
   */

  var roomsController = require('../app/modules/admin/rooms/controllers/rooms_controller');

  router.use(mount('/rooms', authenticationController.onlyAuthenticated));
  router.get('/rooms', roomsController.index);
  router.get('/rooms/:id', roomsController.show);
  router.post('/rooms', roomsController.create);
  router.get('/rooms/:id/approve', roomsController.generateApprove);
  router.post('/rooms/approve/:token', roomsController.approve);

  /**
   * Routes: Purchases
   */

  var purchasesController = require('../app/modules/admin/purchases/controllers/purchases_controller');

  router.use(mount('/rooms/purchases', authenticationController.onlyAuthenticated));
  router.get('/rooms/:roomId/purchases', purchasesController.index);
  router.post('/rooms/:roomId/purchases', purchasesController.create);
  router.get('/rooms/:roomId/purchases/credits', purchasesController.creditsByRoom);
  router.get('/rooms/:roomId/purchases/debits', purchasesController.debitsByRoom);

  /**
   * Return instance of router. Don't delete it.
   */

  return router;
}

module.exports = {
  init: init
};