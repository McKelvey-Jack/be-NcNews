const connection = require('../connection');

const fetchAllTopics = () => {
  return connection.select('*').from('topics').returning('*');
};

module.exports = { fetchAllTopics };
