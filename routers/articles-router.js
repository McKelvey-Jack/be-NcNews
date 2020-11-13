const {
  getArticleById,
  patchArticleById,
  postNewComment,
  getCommentsByArticleId,
  deleteArticleById,
  getAllArticles,
  postNewArticle,
} = require('../controllers/articles');
const { send405 } = require('../errors');
const articlesRouter = require('express').Router();

articlesRouter.route('/').get(getAllArticles).post(postNewArticle).all(send405);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleById)
  .all(send405);

articlesRouter
  .route('/:article_id/comments')
  .post(postNewComment)
  .get(getCommentsByArticleId)
  .all(send405);

module.exports = articlesRouter;
