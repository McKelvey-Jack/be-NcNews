const {
  topicData,
  articlesData,
  commentData,
  usersData,
} = require('../data/index.js');
const {
  timeStampFormatter,
  createIdRef,
  commentformatter,
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
      const idRef = createIdRef(articles);
      const commentsWithTimeStamp = timeStampFormatter(commentData);
      const formattedComments = commentformatter(commentsWithTimeStamp, idRef);
      console.log(formattedComments);
      return knex
        .insert(formattedComments)
        .into('comments')
        .returning('*')
        .then((comments) => {
          console.log(comments, '<<<');
        });
    });

  // add seeding functionality here
};
