const connection = require('../connection');
const updateCommentVotes = (commentId, updateAmount) => {
  if (typeof updateAmount !== 'number') {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }
  return connection('comments')
    .where('comment_id', commentId)
    .increment('votes', updateAmount)
    .returning('*')
    .then((comments) => {
      if (comments.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not Found' });
      } else {
        return comments[0];
      }
    });
};

const removeCommentById = (commentId) => {
  return connection('comments')
    .where('comment_id', commentId)
    .del()
    .then((res) => {
      if (res === 0) {
        return Promise.reject({
          status: 400,
          msg: `no comment with id of ${commentId}`,
        });
      } else {
        return;
      }
    });
};

module.exports = { updateCommentVotes, removeCommentById };
