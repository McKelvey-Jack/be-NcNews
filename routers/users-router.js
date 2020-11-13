const {
  getUserByUsername,
  postNewUser,
  getAllUsers,
} = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.route('/').get(getAllUsers).post(postNewUser);

usersRouter.route('/:username').get(getUserByUsername);

module.exports = usersRouter;
