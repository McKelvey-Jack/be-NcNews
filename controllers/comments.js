const { updateCommentVotes, removeCommentById } = require('../models/comments');

const patchCommentById = (req, res, next) => {
  const commentId = req.params.comment_id;
  const updateAmount = req.body.inc_votes;
  updateCommentVotes(commentId, updateAmount)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

const deleteCommentById = (req, res, next) => {
  const commentId = req.params.comment_id;
  removeCommentById(commentId)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

module.exports = { patchCommentById, deleteCommentById };
