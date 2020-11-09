const {
  topicData,
  articlesData,
  commentData,
  usersData,
} = require('../data/index.js');
const {articlesFormatter} = require('../utils/data-manipulation')

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex.insert(topicData).into('topics').returning('*')
    })
    .then(() => {
      return knex.insert(usersData).into('users').returning('*')
    })
    .then((users) => {
       const formattedArticles = articlesFormatter(articlesData)
      return knex.insert(formattedArticles).into('articles').returning('*')
    })


    
   

  // add seeding functionality here
};
