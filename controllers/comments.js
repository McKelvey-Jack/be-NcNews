const { updateCommentVotes } = require('../models/comments');

const patchCommentById = (req, res, next) => {
  console.log('here');
  const commentId = req.params.comment_id;
  const updateAmount = req.body.inc_votes;
  updateCommentVotes(commentId, updateAmount)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

module.exports = { patchCommentById };
