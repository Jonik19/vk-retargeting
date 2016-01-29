'use strict';

var koa = require('koa');
var app = koa();

var models = require('./app/models');
var config = require('./config');

var router = require('./config/routes').init(app);

/**
 * Routes middlewares
 */

app
  .use(router.routes())
  .use(router.allowedMethods());

models.sequelize.sync().then(function () {

  app.listen(config.http.port, function () {
    console.log('Server is listening on ', config.http.port, ' port');
  });

});