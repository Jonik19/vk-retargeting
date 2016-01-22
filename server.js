'use strict';

var path = require('path');
var fs = require('fs');

var koa = require('koa');
var app = koa();

var sequelize = require('database');
var config = require('config');

var router = require('./config/routes').init(app);

/**
 * Load domains and sync database
 */

let domaisnPath = path.join(config.rootPath, 'app/domains');

fs.readdirSync(domaisnPath).forEach(function (filename) {
  require(`${domaisnPath}/${filename}`);
});

sequelize.sync().then(function () {
  console.log('Database is synced');
});

/**
 * Routes middlewares
 */

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.http.port, function () {
  console.log(`Server is listening on ${config.http.port} port`);
});