const {
  getArticleById,
  patchArticleById,
  postNewComment,
  getCommentsByArticleId,
  deleteArticleById,
  getAllArticles,
} = require('../controllers/articles');
const articlesRouter = require('express').Router();

articlesRouter.route('/').get(getAllArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleById);

articlesRouter
  .route('/:article_id/comments')
  .post(postNewComment)
  .get(getCommentsByArticleId);

module.exports = articlesRouter;
