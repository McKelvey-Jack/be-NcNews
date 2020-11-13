const { fetchUserByUsername, addNewUser } = require('../models/users');

const getUserByUsername = (req, res, next) => {
  const username = req.params.username;
  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

const postNewUser = (req, res, next) => {
  const userInfo = req.body;
  addNewUser(userInfo)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

module.exports = { getUserByUsername, postNewUser };
