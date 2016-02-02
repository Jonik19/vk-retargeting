'use strict';

var response = {};

/**
 * Sends successful(you can change status) response to client
 * with 'success' format of response.
 * Use it when you need to send any kind of data
 *
 * @param {Object} ctx Context of koa
 * @param {Number} data Data to return to client
 * @param {Number} status HTTP status to send to client
 */

response.success = function (ctx, data, status) {
  ctx.body = {
    response: data
  };

  ctx.status = status|| 200;
};

/**
 * Sends successful(you can change status) response to client
 * with 'success-items' format of response.
 * Use it when you need to send list of data: array
 *
 * @param {Object} ctx Context of koa
 * @param {Number} data Data to return to client
 * @param {Number} status HTTP status to send to client
 */

response.items = function (ctx, data, status) {
  ctx.data = {
    items: data || []
  };

  this.success(ctx, ctx.data, status);
};

/**
 * Sends response to client
 * with 'error' format of response.
 * Use it when you need to send an error
 *
 * @param {Object} ctx Context of koa
 * @param {Number} data Data to return to client
 * @param {Number} status HTTP status to send to client
 */

response.error = function (ctx, data, status) {
  ctx.body = {
    error: data
  };

  ctx.status = status || 500;
};


module.exports = response;