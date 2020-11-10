const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router');
const {
  internalErrorHandler,
  customErrorHandler,
  send404,
} = require('./errors');

app.use(express.json());

app.use('/api', apiRouter);
app.use('*', send404);

app.use(customErrorHandler);
app.use(internalErrorHandler);

module.exports = app;
