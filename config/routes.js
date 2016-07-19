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
   * Routes: Users
   */

  var searchController = require('../app/modules/search/controllers/search_controller');

  router.get('/search', searchController.search);

  /**
   * Return instance of router. Don't delete it.
   */

  return router;
}

module.exports = {
  init: init
};
