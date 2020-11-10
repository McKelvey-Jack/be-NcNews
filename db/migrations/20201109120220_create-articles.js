exports.up = function (knex) {
  // console.log('creating articles...');

  return knex.schema.createTable('articles', (articleTable) => {
    articleTable.increments('article_id').primary();
    articleTable.text('title').notNullable();
    articleTable.text('body');
    articleTable.integer('votes').defaultTo(0);
    articleTable.text('topic').references('topics.slug');
    articleTable.text('author').references('users.username').notNullable();
    articleTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('articles');
};
