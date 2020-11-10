const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router');
const { internalErrorHandler } = require('./errors');

app.use(express.json());

app.use('/api', apiRouter);

app.use(internalErrorHandler);

module.exports = app;
