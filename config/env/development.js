'use strict';

module.exports = {
  http: {
    port: 3000
  },
  db: {
    user: 'purchases_admin',
    password: 'dadada',
    database: 'purchases',
    host: 'localhost'
  },
  secrets: {
    authentication: 'secret',
    password: 'secret'
  },
  cors: {
    maxAge: 60, // in seconds,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
    headers: ['Accept', 'Content-type', 'Authorization']
  }
};