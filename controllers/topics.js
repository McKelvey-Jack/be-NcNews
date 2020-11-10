const { fetchAllTopics } = require('../models/topics');

const getAllTopics = (req, res, next) => {
  console.log('in the controller');
  fetchAllTopics().then((topics) => {
    console.log(topics);
    res.status(200).send({ topics });
  });
};

module.exports = { getAllTopics };
