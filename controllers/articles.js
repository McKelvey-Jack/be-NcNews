const {
  fetchArticleById,
  updateArticleVotes,
  addNewComment,
  fetchCommentsByArticleId,
  removeArticleById,
  fetchAllArticles,
  addNewArticle,
  checkAuthorExists,
  checkTopicExists,
} = require('../models/articles');
const articlesRouter = require('../routers/articles-router');

const getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  fetchArticleById(articleId)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const patchArticleById = (req, res, next) => {
  const newVoteCount = req.body.inc_votes;
  const articleId = req.params.article_id;
  updateArticleVotes(articleId, newVoteCount)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const postNewComment = (req, res, next) => {
  const articleId = req.params.article_id;
  const comment = req.body;
  addNewComment(articleId, comment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

const getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  const sortBy = req.query.sort_by;
  const order = req.query.order;
  fetchCommentsByArticleId(articleId, sortBy, order)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const deleteArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  removeArticleById(articleId)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

const getAllArticles = (req, res, next) => {
  const sortBy = req.query.sort_by;
  const order = req.query.order;
  const author = req.query.author;
  const topic = req.query.topic;

  fetchAllArticles(sortBy, order, author, topic)
    .then((articles) => {
      if (articles.length === 0) {
        return Promise.all([
          articles,
          checkAuthorExists(author),
          checkTopicExists(topic),
        ]);
      }
      return [articles];
    })
    .then(([articles, doesAuthorExist, doesTopicExist]) => {
      if (doesAuthorExist === false || doesTopicExist === false) {
        res.status(404).send({ msg: 'Not Found' });
      } else {
        res.status(200).send({ articles });
      }
    })
    .catch(next);
};

const postNewArticle = (req, res, next) => {
  const newArticle = req.body;
  addNewArticle(newArticle)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

module.exports = {
  getArticleById,
  patchArticleById,
  postNewComment,
  getCommentsByArticleId,
  deleteArticleById,
  getAllArticles,
  postNewArticle,
};
