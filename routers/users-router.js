const {
  getUserByUsername,
  postNewUser,
  getAllUsers,
} = require('../controllers/users');
const { send405 } = require('../errors');

const usersRouter = require('express').Router();

usersRouter.route('/').get(getAllUsers).post(postNewUser).all(send405);

usersRouter.route('/:username').get(getUserByUsername).all(send405);

module.exports = usersRouter;
