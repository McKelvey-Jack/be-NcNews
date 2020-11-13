const { leftJoin } = require('../connection');
const connection = require('../connection');

const fetchUserByUsername = (username) => {
  return connection
    .select('*')
    .from('users')
    .where('username', '=', username)
    .returning('*')
    .then((user) => {
      if (user.length === 0) {
        return Promise.reject({ status: 404, msg: 'no user found' });
      } else {
        return user[0];
      }
    });
};

const addNewUser = (newUserInfo) => {
  return connection('users')
    .insert(newUserInfo)
    .returning('*')
    .then((newUser) => {
      return newUser[0];
    });
};

const fetchAllUsers = (sortBy, order) => {
  return (
    connection('users')
      .select('users.*')
      .leftJoin('articles', 'articles.author', '=', 'users.username')
      //.leftJoin('comments', 'comments.author', '=', 'users.username')
      .count('articles.author AS articles_count')
      //.count('articles.author AS article_count')
      .returning('*')
      .groupBy('users.username')
      .orderBy(sortBy || 'username', order || 'asc')
      .then((users) => {
        return users;
      })
  );
};

module.exports = { fetchUserByUsername, addNewUser, fetchAllUsers };
