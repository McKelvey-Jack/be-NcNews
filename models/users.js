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

module.exports = { fetchUserByUsername };
