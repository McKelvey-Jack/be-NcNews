const {
  topicData,
  articlesData,
  commentData,
  usersData,
} = require('../data/index.js');
const {
  timeStampFormatter,
  createRefObject,
  commentFormatter,
} = require('../utils/data-manipulation');

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex.insert(topicData).into('topics').returning('*');
    })
    .then(() => {
      return knex.insert(usersData).into('users').returning('*');
    })
    .then(() => {
      const formattedArticles = timeStampFormatter(articlesData);
      return knex.insert(formattedArticles).into('articles').returning('*');
    })
    .then((articles) => {
      const idRef = createRefObject(articles, 'title', 'article_id');
      const commentsWithTimeStamp = timeStampFormatter(commentData);
      const formattedComments = commentFormatter(commentsWithTimeStamp, idRef);
      return knex.insert(formattedComments).into('comments').returning('*');
    });

  // add seeding functionality here
};
