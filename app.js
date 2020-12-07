const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router');
const cors = require('cors');
const {
  internalErrorHandler,
  customErrorHandler,
  send404,
  PSQLerrors,
} = require('./errors');

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);
app.use('*', send404);

app.use(PSQLerrors);
app.use(customErrorHandler);
app.use(internalErrorHandler);

module.exports = app;
