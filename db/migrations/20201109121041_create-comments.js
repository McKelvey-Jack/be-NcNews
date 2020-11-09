exports.up = function (knex) {
  console.log('creating comments...');

  return knex.schema.createTable('comments', (commentTable) => {
    commentTable.increments('comment_id').primary();
    commentTable.text('author').references('users.username').notNullable();
    commentTable.integer('article_id').references('articles.article_id');
    commentTable.integer('votes').defaultTo(0);
    commentTable.text('body').notNullable();
  });
};

exports.down = function (knex) {
  console.log('cropping comments...');
  return knex.schema.dropTable('comments');
};
