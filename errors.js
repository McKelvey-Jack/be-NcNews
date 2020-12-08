const customErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const PSQLerrors = (err, req, res, next) => {
  console.log(err);

  const errCodes = ['23503', '42703', '42803', '22P02'];
  if (errCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad Request' });
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
const send405 = (req, res, next) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

module.exports = {
  internalErrorHandler,
  customErrorHandler,
  send404,
  PSQLerrors,
  send405,
};
