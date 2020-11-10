const customErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.msg);
  } else {
    next(err);
  }
};

const internalErrorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error.....' });
};

const send404 = (req, res, next) => {
  res.status(404).send({ msg: 'invalid endpoint' });
};

module.exports = { internalErrorHandler, customErrorHandler, send404 };
