const { fetchUserByUsername } = require('../models/users');

const getAllUsers = (req, res, next) => {
  const username = req.params.username;
  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getAllUsers };
