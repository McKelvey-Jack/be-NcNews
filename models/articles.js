const { orderBy } = require('../connection');
const connection = require('../connection');

const fetchArticleById = (articleid) => {
  return connection
    .select('articles.*')
    .from('articles')
    .where('articles.article_id', '=', articleid)
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
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
  if (typeof voteCount !== 'number') {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }
  return connection('articles')
    .where('article_id', '=', articleId)
    .increment('votes', voteCount || 0)
    .returning('*')
    .then((updatedArticle) => {
      if (updatedArticle.length === 0) {
        return Promise.reject({ status: 404, msg: 'No Article Found' });
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
  return checkArticleExists(articleId).then((boolean) => {
    if (boolean === false) {
      return Promise.reject({ status: 404, msg: 'Not Found' });
    } else {
      return connection('comments')
        .select('*')
        .where('article_id', '=', articleId)
        .orderBy(sortBy || 'created_at', order || 'desc')
        .returning('*');
    }
  });
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
      return articles;
    });
};

const addNewArticle = (newArticle) => {
  return connection('articles')
    .insert(newArticle)
    .returning('*')
    .then((articles) => {
      return articles[0];
    });
};

const checkAuthorExists = (author) => {
  if (author === undefined) return Promise.resolve(undefined);

  return connection('users')
    .select('*')
    .where('username', author)
    .then((authors) => {
      if (authors.length === 0) {
        return false;
      }
      return true;
    });
};

const checkTopicExists = (topic) => {
  if (topic === undefined) return Promise.resolve(undefined);

  return connection('topics')
    .select('*')
    .where('slug', topic)
    .then((topics) => {
      if (topics.length === 0) {
        return false;
      }
      return true;
    });
};

const checkArticleExists = (id) => {
  return connection('articles')
    .select('*')
    .where('article_id', id)
    .then((articles) => {
      if (articles.length === 0) {
        return false;
      }
      return true;
    });
};

module.exports = {
  fetchArticleById,
  updateArticleVotes,
  addNewComment,
  fetchCommentsByArticleId,
  removeArticleById,
  fetchAllArticles,
  addNewArticle,
  checkAuthorExists,
  checkTopicExists,
};
