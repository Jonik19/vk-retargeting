'use strict';

var request = require('request');

var vk = {};

/**
 *
 */

vk.call = function (method, query) {
  var deferred = Promise.defer();

  var url = _generateRequest(method, query);

  request(url, function (err, response, body) {
    if(err) {
      return deferred.reject(err);
    }

    deferred.resolve(JSON.parse(body).response);
  });

  return deferred.promise;
};


module.exports = vk;

function _getMethodTemplate(method) {
  return 'https://api.vk.com/method/:method_name'
    .replace(':method_name', method);
}

function _generateRequest(method, query) {
  return {
    url: _getMethodTemplate(method),
    qs: query,
  };
}
