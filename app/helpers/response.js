'use strict';

/**
 * Response constructor
 *
 * @param ctx Context of route (this === ctx)
 * @param data Data to send to client
 * @constructor
 */

function Response(ctx, data) {
  this.ctx = ctx;
  this.data = data;
}

/**
 * Sends successful(you can change status) response to client
 * with 'success' format of response.
 * Use it when you need to send any kind of data
 *
 * @param {Number} status HTTP status to send to client
 */

Response.prototype.success = function (status) {
  this.ctx.body = {
    response: this.data
  };

  this.ctx.status = status|| 200;
};

/**
 * Sends successful(you can change status) response to client
 * with 'success-items' format of response.
 * Use it when you need to send list of data: array
 *
 * @param {Number} status HTTP status to send to client
 */

Response.prototype.items = function (status) {
  this.data = {
    items: this.data
  };

  this.success(status);
};

/**
 * Sends response to client
 * with 'error' format of response.
 * Use it when you need to send an error
 *
 * @param {Number} status HTTP status to send to client
 */

Response.prototype.error = function (status) {
  this.ctx.body = {
    error: this.data
  };

  this.ctx.status = status || 500;
};


module.exports = Response;