// extract any functions you are using to manipulate your data, into this file

// pure function

const timeStampFormatter = (data) => {
  return data.map((object) => {
    const newObject = { ...object };

    newObject.created_at = new Date(object['created_at']);

    return newObject;
  });
};

const createIdRef = (rows) => {
  const ref = {};

  rows.forEach((row) => {
    ref[row.title] = row.article_id;
  });
  return ref;
};

const commentformatter = (commentData, articleRef) => {
  return commentData.map(({ belongs_to, created_by, ...restOfComment }) => {
    const newComment = {
      article_id: articleRef[belongs_to],
      author: created_by,
      ...restOfComment,
    };
    return newComment;
  });
};

module.exports = { timeStampFormatter, createIdRef, commentformatter };
