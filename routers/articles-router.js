const { getArticleById } = require('../controllers/articles');
const articlesRouter = require('express').Router();

articlesRouter.route('/:article_id').get(getArticleById);

module.exports = articlesRouter;
