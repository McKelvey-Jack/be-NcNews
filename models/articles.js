const connection = require('../connection');

const fetchArticleById = (articleid) => {
  return (
    connection
      .select('*')
      .from('articles')
      .where('articles.article_id', '=', articleid)
      //join('comments', 'comments.article_id', '=', 'articles.article_id')
      .returning('*')
      .then((articles) => {
        console.log(articles);
        return connection
          .select('*')
          .from('comments')
          .where('comments.article_id', '=', articleid)
          .returning('*')
          .then((comments) => {
            const articleToReturn = articles[0];
            articleToReturn.comment_count = comments.length;
            if (articles.length === 0) {
              Promise.reject({ status: 404, msg: 'no article found' });
            } else {
              return articleToReturn;
            }
          });
      })
  );
};

module.exports = { fetchArticleById };
