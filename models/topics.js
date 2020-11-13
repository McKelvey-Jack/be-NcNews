const connection = require('../connection');

const fetchAllTopics = () => {
  return connection.select('*').from('topics').returning('*');
};

const addNewTopic = (newTopic) => {
  return connection('topics')
    .insert(newTopic)
    .returning('*')
    .then((topic) => {
      return topic[0];
    });
};

module.exports = { fetchAllTopics, addNewTopic };
