'use strict';

var path = require('path');
var fs = require('fs');

var sequelize = require('database');
var config = require('config');
var koa = require('koa');

var routes = require('./config/routes');

var app = koa();

/**
 * Load domains and sync database
 */

fs.readdirSync(path.join(config.rootPath, 'app/domains'), function (err, file) {
  if(err) console.log(err);

  require(`./app/domains/${file}`);
});

sequelize.sync().then(function () {
  console.log('Database is synced');
});

/**
 * Routes middlewares
 */

app
  .use(routes.routes())
  .use(routes.allowedMethods());

app.listen(config.http.port, function () {
  console.log(`Server is listening on ${config.http.port} port`);
});