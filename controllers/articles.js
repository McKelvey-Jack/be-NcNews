const {
  fetchArticleById,
  updateArticleVotes,
  addNewComment,
  fetchCommentsByArticleId,
  removeArticleById,
  fetchAllArticles,
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
  //const { sortBy, order, author, topic } = req.query;
  const sortBy = req.query.sort_by;
  const order = req.query.order;
  const author = req.query.author;
  const topic = req.query.topic;
  console.log(req.query);
  console.log(sortBy);
  console.log(author);
  console.log(topic);

  fetchAllArticles(sortBy, order, author, topic).then((articles) => {
    res.status(200).send({ articles });
  });
};

module.exports = {
  getArticleById,
  patchArticleById,
  postNewComment,
  getCommentsByArticleId,
  deleteArticleById,
  getAllArticles,
};
