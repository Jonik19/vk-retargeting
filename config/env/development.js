'use strict';

module.exports = {
  http: {
    port: 8888
  },
  cors: {
    maxAge: 60 * 60 * 24 * 7, // one week,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
    headers: ['Accept', 'Content-type', 'Authorization'],
    origin: true
  }
};
