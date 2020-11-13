const { fetchAllTopics, addNewTopic } = require('../models/topics');

const getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

const postNewTopic = (req, res, next) => {
  const newTopic = req.body;
  addNewTopic(newTopic)
    .then((topic) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};

module.exports = { getAllTopics, postNewTopic };
