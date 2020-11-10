const connection = require('../connection');

const fetchAllTopics = () => {
  return connection
    .select('*')
    .from('topics')
    .returning('*')
    .then((topics) => {
      console.log(topics);
      return topics;
    });
};

module.exports = { fetchAllTopics };
