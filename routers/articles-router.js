const {
  getArticleById,
  patchArticleById,
  postNewComment,
  getCommentsByArticleId,
  deleteArticleById,
  getAllArticles,
  postNewArticle,
} = require('../controllers/articles');
const articlesRouter = require('express').Router();

articlesRouter.route('/').get(getAllArticles).post(postNewArticle);

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
