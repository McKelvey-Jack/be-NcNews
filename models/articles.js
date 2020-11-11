const { orderBy } = require('../connection');
const connection = require('../connection');

const fetchArticleById = (articleid) => {
  return connection
    .select('articles.*')
    .from('articles')
    .where('articles.article_id', '=', articleid)
    .join('comments', 'comments.article_id', '=', 'articles.article_id')
    .count('comment_id AS comment_count')
    .returning('*')
    .groupBy('articles.article_id')
    .then((articles) => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: 'article not found' });
      } else {
        return articles[0];
      }
    });
};

const updateArticleVotes = (articleId, voteCount) => {
  return connection('articles')
    .where('article_id', '=', articleId)
    .increment('votes', voteCount)
    .returning('*')
    .then((updatedArticle) => {
      if (updatedArticle.length === 0) {
        return Promise.reject({ status: 404, msg: 'article not found' });
      } else {
        return updatedArticle[0];
      }
    });
};

const removeArticleById = (articleId) => {
  return connection('comments')
    .where('article_id', '=', articleId)
    .delete()
    .then(() => {
      return connection('articles')
        .where('article_id', '=', articleId)
        .delete()
        .then((res) => {
          if (res === 0) {
            return Promise.reject({
              status: 400,
              msg: `no article with an id of ${articleId}`,
            });
          } else {
            return;
          }
        });
    });
};

const addNewComment = (articleId, commentInfo) => {
  commentInfo.article_id = articleId;
  commentInfo.author = commentInfo.username;
  delete commentInfo.username;
  return connection('comments')
    .insert(commentInfo)
    .returning('*')
    .then((comment) => {
      return comment[0];
    });
};

const fetchCommentsByArticleId = (articleId, sortBy, order) => {
  return connection('comments')
    .select('*')
    .where('article_id', '=', articleId)
    .orderBy(sortBy || 'created_at', order || 'desc')
    .returning('*');
};

const fetchAllArticles = (sortBy, order, author, topic) => {
  return connection
    .select('articles.*')
    .from('articles')
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .count('comment_id AS comment_count')
    .returning('*')
    .orderBy(sortBy || 'created_at', order || 'desc')
    .groupBy('articles.article_id')
    .modify((articles) => {
      if (author) {
        articles.where('articles.author', author);
      }
      if (topic) {
        articles.where('articles.topic', topic);
      }
    })
    .then((articles) => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: 'article not found' });
      } else {
        return articles;
      }
    });
};

module.exports = {
  fetchArticleById,
  updateArticleVotes,
  addNewComment,
  fetchCommentsByArticleId,
  removeArticleById,
  fetchAllArticles,
};
