const {
  fetchUserByUsername,
  addNewUser,
  fetchAllUsers,
} = require('../models/users');

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

const getAllUsers = (req, res, next) => {
  const sortBy = req.query.sort_by;
  const order = req.query.order;
  fetchAllUsers(sortBy, order)
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

module.exports = { getUserByUsername, postNewUser, getAllUsers };
