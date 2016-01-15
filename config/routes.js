'use strict';

var jwt = require('koa-jwt');
var bodyparser = require('koa-bodyparser');
var router = require('koa-router')();

router.use(bodyparser());

/**
 * Your routes go here
 */

/**
 * Errors handling
 */

var errorsController = require('../app/errors/controllers/errors_controller');

router.use(errorsController.catchAll);

/**
 * Routes: Authentication
 */

var authenticationController = require('../app/authentication/controllers/authentication_controller');

router.get('/sign-out', authenticationController.onlyAuthenticated);
router.get('/sign-out', authenticationController.signOut);

router.get('/sign-up', authenticationController.signUp);

router.get('/sign-in', authenticationController.signIn);
router.get('/sign-in', function *(next) {
  this.body = 'last';
});

module.exports = router;