const { getAllUsers } = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.route('/:username').get(getAllUsers);

module.exports = usersRouter;
